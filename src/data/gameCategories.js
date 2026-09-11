export const modes = [
  {
    id: 'classic',
    number: '01',
    title: 'Classic Mode',
    description: 'Build the best six-game collection across genres and decades.',
    detail: '6 GAMES / ALL CONSOLES / 2 REROLLS',
    color: 'green',
    symbol: '◆',
  },
  {
    id: 'console',
    number: '02',
    title: 'Console Mode',
    description: 'Choose a platform, then build the greatest lineup it can offer.',
    detail: 'ONE PLATFORM / ALL ERAS / 2 REROLLS',
    color: 'blue',
    symbol: '▣',
  },
  {
    id: 'daily',
    number: '03',
    title: 'Daily Challenge',
    description: 'Take on the same themed collection as every other player.',
    detail: 'NEW DAILY / NO REROLLS',
    color: 'gold',
    symbol: '★',
  },
]

export const decades = ["'80s", "'90s", "'00s", "'10s", "'20s"]

export const decadeRanges = [
  { label: '1980s', start: 1980, end: 1989 },
  { label: '1990s', start: 1990, end: 1999 },
  { label: '2000s', start: 2000, end: 2009 },
  { label: '2010s', start: 2010, end: 2019 },
  {
    label: '2020s',
    start: 2020,
    end: new Date().getFullYear(),
  },
]

export const genres = [
  'Action',
  'Adventure',
  'RPG',
  'Shooter',
  'Platformer',
  'Strategy',
  'Racing',
  'Sports',
  'Fighting',
  'Puzzle',
  'Simulation',
  'Horror',
]

export const consoles = [
  {
    name: 'Nintendo',
    systems: [
      'NES',
      'SNES',
      'Nintendo 64',
      'GameCube',
      'Wii',
      'Wii U',
      'Switch',
      'Game Boy',
      'Game Boy Color',
      'Game Boy Advance',
      'Nintendo DS',
      'Nintendo 3DS',
    ],
  },
  {
    name: 'PlayStation',
    systems: [
      'PlayStation',
      'PlayStation 2',
      'PlayStation 3',
      'PlayStation 4',
      'PlayStation 5',
      'PSP',
      'PlayStation Vita',
    ],
  },
  {
    name: 'Xbox',
    systems: [
      'Xbox',
      'Xbox 360',
      'Xbox One',
      'Xbox Series X|S',
    ],
  },
  {
    name: 'Sega',
    systems: [
      'Master System',
      'Genesis / Mega Drive',
      'Sega CD',
      '32X',
      'Saturn',
      'Dreamcast',
    ],
  },
  {
    name: 'PC',
    systems: [
      'Windows',
      'macOS',
      'Linux',
    ],
  },
]

function seededShuffle(items, seed = Math.random()) {
  return [...items].sort(
    (a, b) =>
      Math.sin((genres.indexOf(a) + 1) * 999 + seed * 1000) -
      Math.sin((genres.indexOf(b) + 1) * 999 + seed * 1000),
  )
}

export function buildChallenges(mode, consoleName) {
  if (mode === 'daily') {
    return getDailyChallenge().challenges
  }

  return seededShuffle(genres)
    .slice(0, 6)
    .map((genre) => {
      if (mode === 'console') {
        return {
          genre,
          decade: 'All eras',
          console: consoleName,
        }
      }

      const decade =
        decadeRanges[Math.floor(Math.random() * decadeRanges.length)]

      return {
        genre,
        decade: decade.label,
        start: decade.start,
        end: decade.end,
      }
    })
}

export function getDailyChallenge() {
  const seed = Math.floor(
    new Date().setHours(0, 0, 0, 0) / 86400000,
  )

  // Even-numbered days use one decade across multiple genres.
  if (seed % 2 === 0) {
    const decade = decadeRanges[seed % decadeRanges.length]
    const dailyGenres = seededShuffle(genres, seed).slice(0, 6)

    return {
      type: 'decade',
      title: `The Best of the ${decade.label}`,
      description:
        `Build today's collection using games released during the ${decade.label}.`,
      challenges: dailyGenres.map((genre) => ({
        genre,
        decade: decade.label,
        start: decade.start,
        end: decade.end,
      })),
    }
  }

  // Odd-numbered days use one genre across multiple decades.
  const genre = genres[seed % genres.length]

  const orderedDecades = [...decadeRanges].sort(
    (a, b) =>
      Math.sin((decadeRanges.indexOf(a) + 1) * 731 + seed) -
      Math.sin((decadeRanges.indexOf(b) + 1) * 731 + seed),
  )

  const sixDecades = [
    ...orderedDecades,
    orderedDecades[seed % orderedDecades.length],
  ]

  return {
    type: 'genre',
    title: `The Ultimate ${genre} Collection`,
    description:
      `Build today's collection using ${genre.toLowerCase()} games from across the decades.`,
    challenges: sixDecades.map((decade) => ({
      genre,
      decade: decade.label,
      start: decade.start,
      end: decade.end,
    })),
  }
}