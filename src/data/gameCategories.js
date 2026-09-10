import { sampleGames } from './sampleGames'

export const modes = [
  { id: 'classic', number: '01', title: 'Classic Mode', description: 'Build the best six-game collection across genres and decades.', detail: '6 GAMES / ALL CONSOLES / 2 REROLLS', color: 'green', symbol: '◆' },
  { id: 'console', number: '02', title: 'Console Mode', description: 'Choose a system, then build the greatest lineup it can offer.', detail: 'ONE CONSOLE / ALL ERAS / 2 REROLLS', color: 'blue', symbol: '▣' },
  { id: 'daily', number: '03', title: 'Daily Challenge', description: 'Take on the same themed collection as every other player.', detail: 'NEW DAILY / NO REROLLS', color: 'gold', symbol: '★' },
]
export const decades = ["'80s", "'90s", "'00s", "'10s", "'20s"]
export const decadeRanges = [
  { label: '1980s', start: 1980, end: 1989 }, { label: '1990s', start: 1990, end: 1999 },
  { label: '2000s', start: 2000, end: 2009 }, { label: '2010s', start: 2010, end: 2019 },
  { label: '2020s', start: 2020, end: 2029 },
]
export const genres = ['Action', 'Adventure', 'RPG', 'Shooter', 'Platformer', 'Strategy', 'Racing', 'Sports', 'Fighting', 'Puzzle', 'Simulation', 'Horror']
export const consoles = ['NES', 'SNES', 'Nintendo 64', 'GameCube', 'Wii', 'Nintendo Switch', 'PlayStation', 'PlayStation 2', 'PlayStation 3', 'PlayStation 4', 'PlayStation 5', 'Xbox', 'Xbox 360', 'Xbox One', 'Xbox Series X|S', 'Sega Genesis', 'Dreamcast', 'PC']

function shuffle(items, seed = Math.random()) {
  return [...items].sort((a, b) => Math.sin((a.id || genres.indexOf(a) + 1) * 999 + seed * 1000) - Math.sin((b.id || genres.indexOf(b) + 1) * 999 + seed * 1000))
}

export function buildChallenges(mode, consoleName) {
  if (mode === 'daily') {
    const seed = Math.floor(new Date().setHours(0, 0, 0, 0) / 86400000)
    return shuffle(genres, seed).slice(0, 6).map((genre, index) => ({ genre, decade: decadeRanges[(seed + index) % decadeRanges.length].label }))
  }
  return shuffle(genres).slice(0, 6).map((genre) => ({ genre, decade: mode === 'console' ? 'All eras' : decadeRanges[Math.floor(Math.random() * decadeRanges.length)].label, console: consoleName }))
}

export function gamesForChallenge(challenge, excluded = [], seed = 0) {
  const decade = decadeRanges.find((item) => item.label === challenge.decade)
  let eligible = sampleGames.filter((game) => !excluded.includes(game.id) && (!decade || (game.year >= decade.start && game.year <= decade.end)))
  if (eligible.length < 8) eligible = sampleGames.filter((game) => !excluded.includes(game.id))
  return shuffle(eligible, seed || Math.random()).slice(0, 8)
}
