import './App.css'

const modes = [
  {
    number: '01',
    icon: '◆',
    title: 'Classic Mode',
    description: 'Build the best collection across genres and decades.',
    detail: '6 GAMES • 2 REROLLS',
    color: 'green',
  },
  {
    number: '02',
    icon: '▣',
    title: 'Console Mode',
    description: 'Choose one console and assemble its ultimate lineup.',
    detail: 'ONE SYSTEM • ALL ERAS',
    color: 'blue',
  },
  {
    number: '03',
    icon: '★',
    title: 'Daily Challenge',
    description: 'One shared challenge. One collection. Every day.',
    detail: 'NO REROLLS • DAILY RESET',
    color: 'gold',
  },
]

function App() {
  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Best Video Game Collection home">
          <span className="brand-mark" aria-hidden="true">B</span>
          <span>BEST VIDEO GAME<br /><strong>COLLECTION</strong></span>
        </a>
        <p className="player-status"><span aria-hidden="true" /> PLAYER 1 READY</p>
      </header>

      <section className="hero" id="top">
        <div className="pixel-grid" aria-hidden="true" />
        <div className="hero-copy">
          <p className="eyebrow"><span>NEW GAME</span> BUILD YOUR ALL-TIME LINEUP</p>
          <h1>WHAT MAKES THE<br /><em>PERFECT COLLECTION?</em></h1>
          <p className="intro">Pick the games. Survive the choices. Build a collection worthy of the high-score table.</p>
          <a className="start-button" href="#modes"><span aria-hidden="true">▶</span> CHOOSE YOUR MODE</a>
        </div>

        <div className="arcade-art" aria-label="Retro game controller illustration">
          <span className="spark spark-one" aria-hidden="true">+</span>
          <span className="spark spark-two" aria-hidden="true">◇</span>
          <div className="controller" aria-hidden="true">
            <span className="dpad horizontal" />
            <span className="dpad vertical" />
            <span className="controller-button button-a" />
            <span className="controller-button button-b" />
            <span className="controller-label">SELECT&nbsp;&nbsp; START</span>
          </div>
          <div className="controller-shadow" aria-hidden="true" />
          <p>PRESS START TO BUILD</p>
        </div>
      </section>

      <section className="modes" id="modes">
        <div className="section-heading">
          <h2>SELECT GAME MODE</h2>
          <p>Choose how you want to play</p>
        </div>

        <div className="mode-grid">
          {modes.map((mode) => (
            <article className={`mode-card ${mode.color}`} key={mode.title}>
              <div className="mode-topline"><span>{mode.number}</span><i>{mode.icon}</i></div>
              <h3>{mode.title}</h3>
              <p>{mode.description}</p>
              <div className="mode-detail">{mode.detail}</div>
              <button type="button">START MODE <span aria-hidden="true">→</span></button>
            </article>
          ))}
        </div>
      </section>

      <footer>
        <p>© 2026 BEST VIDEO GAME COLLECTION</p>
        <p>BUILD. CHOOSE. COMPARE.</p>
      </footer>
    </main>
  )
}

export default App
