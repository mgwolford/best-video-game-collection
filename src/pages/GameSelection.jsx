import { useEffect, useState } from 'react'
import '../App.css'
import '../rawg.css'
import GameCard from '../components/GameCard'
import CollectionBar from '../components/CollectionBar'
import { getGamesForChallenge } from '../services/rawg'
import { decades, genres } from '../data/gameCategories'

function getDifferentValue(values, currentValue) {
  const alternatives = values.filter((value) => value !== currentValue)
  return alternatives[Math.floor(Math.random() * alternatives.length)]
}

function GameSelection({ mode, consoleName, challenges, onFinish }) {
  const [round, setRound] = useState(0)
  const [collection, setCollection] = useState([])
  const [rerolls, setRerolls] = useState(mode === 'daily' ? 0 : 2)
  const [roll, setRoll] = useState(1)
  const [selectedGame, setSelectedGame] = useState(null)
  const [choices, setChoices] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [rerolledChallenges, setRerolledChallenges] = useState({})
  const challenge = rerolledChallenges[round] ?? challenges[round]

  useEffect(() => {
    const controller = new AbortController()
    setLoading(true)
    setError('')
    setChoices([])

    getGamesForChallenge(challenge, collection.map((game) => game.id), roll, controller.signal)
      .then((games) => {
   if (games.length === 0) throw new Error('RAWG could not find games for this round. Try again.')

        setChoices(games)
      })
      .catch((requestError) => {
        if (requestError.name !== 'AbortError') setError(requestError.message)
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false)
      })

    return () => controller.abort()
  }, [challenge, collection, roll])

  function pickGame(game) {
    const updated = [...collection, { ...game, challenge }]
    if (round === challenges.length - 1) onFinish(updated)
    else {
      setCollection(updated)
      setSelectedGame(null)
      setRound((value) => value + 1)
      setRoll(1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  function rerollRound() {
    const newChallenge = {
      ...challenge,
      genre: getDifferentValue(genres, challenge.genre),
      decade: getDifferentValue(decades, challenge.decade),
    }

    setSelectedGame(null)
    setRerolls((value) => value - 1)
    setRerolledChallenges((current) => ({
      ...current,
      [round]: newChallenge,
    }))
    setRoll((value) => value + 1)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return <main className="play-screen"><div className="screen-grid" aria-hidden="true" />
    <header className="play-header"><h1>Best Video Game Collection</h1></header>
    <section className="challenge-banner"><div><p className="eyebrow">ROUND {String(round + 1).padStart(2, '0')}</p><h1>{challenge.genre}</h1><p>{challenge.decade}{consoleName ? ` · ${consoleName}` : ''}</p></div>
      <div className="run-status"><span>COLLECTION <b>{collection.length}/6</b></span><span>REROLLS <b>{rerolls}</b></span></div>
    </section>
    <section className="choices-section" aria-label="Choose a game"><div className="choices-heading">
      <button className="reroll-button" disabled={!rerolls || loading} onClick={rerollRound}><span className="reroll-icon" aria-hidden="true">↻</span><span className="reroll-copy"><b>REROLL ROUND</b><small>{rerolls} LEFT</small></span></button></div>
      {loading && <div className="api-state" role="status"><span className="loading-pixel" />LOADING GAMES...</div>}
      {error && <div className="api-state error-state" role="alert"><p>{error}</p><button onClick={() => setRoll((value) => value + 1)}>TRY AGAIN</button></div>}
      {!loading && !error && <div className="game-grid">{choices.map((game, index) => <GameCard key={`${game.id}-${roll}`} game={game} number={index + 1} onSelect={setSelectedGame} onConfirm={() => pickGame(game)} selected={selectedGame?.id === game.id} />)}</div>}
    </section>
    <CollectionBar collection={collection} />
    <a className="rawg-credit" href="https://rawg.io" target="_blank" rel="noreferrer">Game data provided by RAWG</a>
  </main>
}

export default GameSelection
