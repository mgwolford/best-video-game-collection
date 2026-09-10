function GameCard({ game, onSelect, onConfirm, number, selected }) {
  return <article className="game-choice">
    <button className={`game-card ${selected ? 'selected' : ''}`} onClick={() => onSelect(game)} aria-pressed={selected}>
      <span className={`game-art art-${game.id % 5}`}><b>{String(number).padStart(2, '0')}</b><i aria-hidden="true">◆</i></span>
      <span className="game-info"><strong>{game.name}</strong><span>{game.year} · {game.studio}</span></span>
      <span className="pick-label">{selected ? 'SELECTED' : 'CHOOSE GAME'}</span>
    </button>
    {selected && <button className="card-confirm" onClick={onConfirm}>CONFIRM PICK</button>}
  </article>
}

export default GameCard
