import '../App.css'
import { consoles } from '../data/gameCategories'

function ConsoleSelect({ onChoose, onBack }) {
  return <main className="play-screen setup-screen"><div className="screen-grid" aria-hidden="true" />
    <header className="play-header"><button className="text-button" onClick={onBack}>← MAIN MENU</button><span>CONSOLE MODE</span></header>
    <section className="setup-panel"><p className="eyebrow">PLAYER SELECT</p><h1>CHOOSE A CONSOLE</h1><p>Every round will pull from this system’s library.</p>
      <div className="console-grid">{consoles.map((name) => <button key={name} onClick={() => onChoose(name)}>{name}<span>→</span></button>)}</div>
    </section>
  </main>
}

export default ConsoleSelect
