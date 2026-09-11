import '../App.css'

function Results({ collection, onHome }) {
  const average = Math.round(collection.reduce((total, game) => total + game.score, 0) / collection.length)
  const achievement = average >= 90
    ? { name: 'Hall of Fame', message: 'A legendary collection worthy of gaming history.', hearts: 5, tier: 'hall-of-fame' }
    : average >= 80
      ? { name: 'Elite Collection', message: 'An excellent lineup filled with generation-defining games.', hearts: 4, tier: 'elite' }
      : average >= 70
        ? { name: 'Platinum Player', message: 'A powerful collection filled with undeniable classics.', hearts: 3, tier: 'platinum' }
        : { name: 'Seasoned Gamer', message: 'A solid collection built by someone who knows their games.', hearts: 2, tier: 'seasoned' }

  async function shareResults() {
    const games = collection.map((game) => game.name).join(', ')
    const shareData = {
      title: 'My Best Video Game Collection',
      text: `I scored ${average}/100 and unlocked ${achievement.name}! My collection: ${games}`,
      url: window.location.href,
    }

    if (navigator.share) await navigator.share(shareData)
    else {
      await navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`)
      window.alert('Results copied to your clipboard!')
    }
  }

  return <main className="play-screen results-screen"><div className="screen-grid" aria-hidden="true" />
    <section className={`achievement-panel ${achievement.tier}`}>
      <div className="pixel-confetti" aria-hidden="true"><i /><i /><i /><i /><i /><i /></div>
      <p className="achievement-unlocked">★ ACHIEVEMENT UNLOCKED ★</p>
      <div className="heart-meter" aria-label={`${achievement.hearts} of 5 hearts`}>
        {[0, 1, 2, 3, 4].map((heart) => <span key={heart} className={heart < achievement.hearts ? 'filled' : 'empty'}>♥</span>)}
      </div>
      <h1>{achievement.name}</h1>
      <div className="final-score"><strong>{average}</strong><small>/100</small></div>
      <p className="achievement-message">{achievement.message}</p>
    </section>
    <div className="collection-heading"><p>RUN COMPLETE</p><h2>YOUR COLLECTION</h2></div>
    <section className="results-grid">{collection.map((game, index) => <article key={game.id}><span>{String(index + 1).padStart(2, '0')}</span><div><small>{game.challenge.genre} · {game.challenge.decade}</small><h2>{game.name}</h2><p>{game.year} · {game.studio}</p></div><strong>{game.score}</strong></article>)}</section>
    <div className="results-actions"><button onClick={shareResults}>SHARE RESULTS</button><button className="secondary" onClick={onHome}>BUILD ANOTHER COLLECTION</button></div>
  </main>
}

export default Results
