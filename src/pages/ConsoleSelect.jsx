import '../App.css'
import { consoles } from '../data/gameCategories'

function ConsoleSelect({ onChoose, onBack }) {
  return <main className="play-screen setup-screen"><div className="screen-grid" aria-hidden="true" />
    <header className="play-header"><button className="text-button" onClick={onBack}>← MAIN MENU</button><span>CONSOLE MODE</span></header>
    <section className="setup-panel"><p className="eyebrow">PLAYER SELECT</p><h1>CHOOSE A PLATFORM</h1><p>Every round will pull from games released across this platform family.</p>
      <div className="console-grid">{consoles.map((console) => <button key={console.name} onClick={() => onChoose(console.name)}>
        <span className="console-copy"><strong>{console.name}</strong><small>{console.systems.join(' · ')}</small></span>
        <span className="console-arrow" aria-hidden="true">→</span>
      </button>)}</div>
    </section>
  </main>
}

export default ConsoleSelect
