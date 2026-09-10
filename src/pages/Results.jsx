import '../App.css'

function Results({ collection, mode, onAgain, onHome }) {
  const average = Math.round(collection.reduce((total, game) => total + game.score, 0) / collection.length)
  return <main className="play-screen results-screen"><div className="screen-grid" aria-hidden="true" />
    <section className="results-title"><p className="eyebrow">RUN COMPLETE</p><h1>YOUR COLLECTION</h1><div className="final-score"><span>COLLECTION SCORE</span><strong>{average}</strong><small>/100</small></div></section>
    <section className="results-grid">{collection.map((game, index) => <article key={game.id}><span>{String(index + 1).padStart(2, '0')}</span><div><small>{game.challenge.genre} · {game.challenge.decade}</small><h2>{game.name}</h2><p>{game.year} · {game.studio}</p></div><strong>{game.score}</strong></article>)}</section>
    <div className="results-actions"><button onClick={() => onAgain(mode)}>PLAY AGAIN</button><button className="secondary" onClick={onHome}>MAIN MENU</button></div>
  </main>
}

export default Results
