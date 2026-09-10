import '../App.css'
import { decades, modes } from '../data/gameCategories'

function Home({ onStart }) {
  return <main className="start-screen"><div className="screen-grid" aria-hidden="true" />
    <section className="intro-panel" aria-labelledby="page-title"><p className="kicker">BUILD YOUR ALL-TIME LINEUP</p>
      <h1 id="page-title">BEST VIDEO GAME<span>COLLECTION</span></h1>
      <p className="intro-copy">Pick the games. Survive the choices. Build a collection worthy of the high-score table.</p>
      <div className="decade-row" aria-label="Games from the 1980s through the 2020s">{decades.map((decade) => <span key={decade}>{decade}</span>)}</div>
    </section>
    <section className="mode-panel" id="game-modes" aria-labelledby="mode-heading"><div className="mode-heading"><p>MAIN MENU</p><h2 id="mode-heading">CHOOSE YOUR MODE</h2></div>
      <div className="mode-list">{modes.map((mode) => <button className={`mode-card ${mode.color}`} type="button" key={mode.id} onClick={() => onStart(mode.id)}>
        <span className="mode-number">{mode.number}</span><span className="mode-symbol" aria-hidden="true">{mode.symbol}</span>
        <span className="mode-copy"><strong>{mode.title}</strong><span>{mode.description}</span><small>{mode.detail}</small></span><span className="mode-arrow" aria-hidden="true">→</span>
      </button>)}</div>
    </section><footer><span>© 2026 BEST VIDEO GAME COLLECTION</span><span>BUILD · CHOOSE · COMPARE</span></footer>
  </main>
}

export default Home
