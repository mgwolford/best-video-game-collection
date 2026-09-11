const API_URL = 'https://api.rawg.io/api'
const PAGE_SIZE = 40

const genreFilters = {
  Action: { genres: 'action' },
  Adventure: { genres: 'adventure' },
  RPG: { genres: 'role-playing-games-rpg' },
  Shooter: { genres: 'shooter' },
  Platformer: { genres: 'platformer' },
  Strategy: { genres: 'strategy' },
  Racing: { genres: 'racing' },
  Sports: { genres: 'sports' },
  Fighting: { genres: 'fighting' },
  Puzzle: { genres: 'puzzle' },
  Simulation: { genres: 'simulation' },
  Horror: { tags: 'horror' },
}

// RAWG platform IDs. Grouping them keeps Console Mode's five simple choices
// while still searching the important systems within each platform family.
const platformFilters = {
  Nintendo: '49,79,83,105,11,10,7,26,43,24,9,8',
  PlayStation: '27,15,16,18,187,17,19',
  Xbox: '80,14,1,186',
  Sega: '74,167,119,117,107,106',
  PC: '4,5,6',
}

function seededShuffle(items, seed) {
  let value = Number(seed) || Date.now()
  const copy = [...items]

  for (let index = copy.length - 1; index > 0; index -= 1) {
    value = (value * 9301 + 49297) % 233280
    const target = Math.floor((value / 233280) * (index + 1))
    ;[copy[index], copy[target]] = [copy[target], copy[index]]
  }

  return copy
}

function collectionScore(game, highestAdded) {
  const criticScore = game.metacritic ?? Math.round((game.rating || 0) * 20)
  const popularityScore = highestAdded ? Math.round(((game.added || 0) / highestAdded) * 100) : 0
  return Math.max(0, Math.min(100, Math.round((criticScore * 0.9) + (popularityScore * 0.1))))
}

function normalizeGames(games) {
  const highestAdded = Math.max(...games.map((game) => game.added || 0), 1)

  return games.map((game) => ({
    id: game.id,
    name: game.name,
    year: game.released ? Number(game.released.slice(0, 4)) : 'Unknown',
    score: collectionScore(game, highestAdded),
    image: game.background_image,
    platforms: (game.platforms || []).map(({ platform }) => platform.name),
    studio: (game.platforms || []).slice(0, 2).map(({ platform }) => platform.name).join(' / ') || 'Platform unavailable',
    rawgUrl: `https://rawg.io/games/${game.slug}`,
  }))
}

export async function getGamesForChallenge(challenge, excluded = [], roll = 1, signal) {
  const apiKey = import.meta.env.VITE_RAWG_API_KEY
  if (!apiKey) throw new Error('RAWG API key is missing. Add VITE_RAWG_API_KEY to your .env file.')

  const params = new URLSearchParams({
    key: apiKey,
    page_size: String(PAGE_SIZE),
    ordering: '-added',
    exclude_additions: 'true',
  })

  const filter = genreFilters[challenge.genre]
  if (filter?.genres) params.set('genres', filter.genres)
  if (filter?.tags) params.set('tags', filter.tags)
  if (challenge.start && challenge.end) params.set('dates', `${challenge.start}-01-01,${challenge.end}-12-31`)
  if (challenge.console && platformFilters[challenge.console]) params.set('platforms', platformFilters[challenge.console])

  async function fetchPage(page) {
    params.set('page', String(page))
    const response = await fetch(`${API_URL}/games?${params}`, { signal })
    if (!response.ok) throw new Error(`RAWG request failed (${response.status}). Please try again.`)
    return response.json()
  }

  // Older or narrower combinations can have fewer heavily rated games on the
  // first page. Pull two pages before deciding which games are usable.
  const [firstPage, secondPage] = await Promise.all([fetchPage(1), fetchPage(2)])
  const uniqueGames = [...(firstPage.results || []), ...(secondPage.results || [])]
    .filter((game, index, games) => games.findIndex((item) => item.id === game.id) === index)
    .filter((game) => game.background_image && game.released && !excluded.includes(game.id))

  // Prefer recognizable games. For sparse older categories, lower the rating
  // threshold instead of abandoning the requested genre or decade.
  const ratingThresholds = [20, 10, 5, 1, 0]
  const usableGames = ratingThresholds
    .map((minimum) => uniqueGames.filter((game) => (game.ratings_count || 0) >= minimum))
    .find((games) => games.length >= 8) || uniqueGames

  return seededShuffle(normalizeGames(usableGames), roll + challenge.genre.length).slice(0, 8)
}
