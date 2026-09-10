import { useMemo, useState } from 'react'
import '../App.css'
import GameCard from '../components/GameCard'
import CollectionBar from '../components/CollectionBar'
import { gamesForChallenge, modes } from '../data/gameCategories'

function GameSelection({ mode, consoleName, challenges, onFinish, onQuit }) {
  const [round, setRound] = useState(0)
  const [collection, setCollection] = useState([])
  const [rerolls, setRerolls] = useState(mode === 'daily' ? 0 : 2)
  const [roll, setRoll] = useState(1)
  const [selectedGame, setSelectedGame] = useState(null)
  const challenge = challenges[round]
  const choices = useMemo(
    () => gamesForChallenge(challenge, collection.map((game) => game.id), roll),
    [challenge, collection, roll],
  )

  function pickGame(game) {
    const updated = [...collection, { ...game, challenge }]
    if (round === challenges.length - 1) onFinish(updated)
    else {
      setCollection(updated)
      setSelectedGame(null)
      setRound((value) => value + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return <main className="play-screen"><div className="screen-grid" aria-hidden="true" />
    <header className="play-header"><button className="text-button" onClick={onQuit}>← QUIT RUN</button><span>{mode === 'console' ? consoleName : modes.find((item) => item.id === mode)?.title}</span><strong>{round + 1} / 6</strong></header>
    <section className="challenge-banner"><div><p className="eyebrow">ROUND {String(round + 1).padStart(2, '0')}</p><h1>{challenge.genre}</h1><p>{challenge.decade}{consoleName ? ` · ${consoleName}` : ''}</p></div>
      <div className="run-status"><span>COLLECTION <b>{collection.length}/6</b></span><span>REROLLS <b>{rerolls}</b></span></div>
    </section>
    <section className="choices-section" aria-labelledby="pick-heading"><div className="choices-heading"><div><p className="eyebrow">GAME SELECT</p><h2 id="pick-heading">CHOOSE ONE GAME</h2></div>
      <button className="reroll-button" disabled={!rerolls} onClick={() => { setSelectedGame(null); setRerolls((value) => value - 1); setRoll((value) => value + 1) }}>↻ REROLL BOARD <span>{rerolls} LEFT</span></button></div>
      <div className="game-grid">{choices.map((game, index) => <GameCard
        key={`${game.id}-${roll}`}
        game={game}
        number={index + 1}
        onSelect={setSelectedGame}
        onConfirm={() => pickGame(game)}
        selected={selectedGame?.id === game.id}
      />)}</div>
    </section>
    <CollectionBar collection={collection} />
  </main>
}

export default GameSelection
