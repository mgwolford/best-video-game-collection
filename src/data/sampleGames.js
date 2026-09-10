export const sampleGames = [
  ['Super Mario Bros. 3', 1988, 'Nintendo', 92], ['Mega Man 2', 1988, 'Capcom', 88], ['The Legend of Zelda', 1986, 'Nintendo', 90], ['Metroid', 1986, 'Nintendo', 86],
  ['Chrono Trigger', 1995, 'Square', 94], ['Super Metroid', 1994, 'Nintendo', 96], ['Final Fantasy VII', 1997, 'Square', 92], ['Castlevania: Symphony of the Night', 1997, 'Konami', 93],
  ['Half-Life 2', 2004, 'Valve', 96], ['Shadow of the Colossus', 2005, 'Team Ico', 91], ['BioShock', 2007, '2K Games', 94], ['Portal', 2007, 'Valve', 90],
  ['The Last of Us', 2013, 'Naughty Dog', 95], ['The Witcher 3: Wild Hunt', 2015, 'CD Projekt Red', 96], ['Celeste', 2018, 'Maddy Makes Games', 92], ['Hades', 2020, 'Supergiant Games', 93],
  ['Elden Ring', 2022, 'FromSoftware', 96], ['Baldur’s Gate 3', 2023, 'Larian Studios', 96], ['Alan Wake 2', 2023, 'Remedy', 89], ['Astro Bot', 2024, 'Team Asobi', 94],
  ['Mario Kart 8 Deluxe', 2017, 'Nintendo', 92], ['Street Fighter 6', 2023, 'Capcom', 92], ['Forza Horizon 5', 2021, 'Playground Games', 92], ['Resident Evil 4', 2005, 'Capcom', 96],
].map(([name, year, studio, score], index) => ({ id: index + 1, name, year, studio, score }))
