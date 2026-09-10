import { useState } from 'react'
import Home from './pages/Home'
import ConsoleSelect from './pages/ConsoleSelect'
import GameSelection from './pages/GameSelection'
import Results from './pages/Results'
import { buildChallenges } from './data/gameCategories'

function App() {
  const [screen, setScreen] = useState('home')
  const [mode, setMode] = useState(null)
  const [consoleName, setConsoleName] = useState('')
  const [challenges, setChallenges] = useState([])
  const [collection, setCollection] = useState([])

  function start(selectedMode) {
    setMode(selectedMode)
    setCollection([])
    if (selectedMode === 'console') setScreen('console')
    else {
      setChallenges(buildChallenges(selectedMode))
      setScreen('play')
    }
  }

  function chooseConsole(name) {
    setConsoleName(name)
    setChallenges(buildChallenges('console', name))
    setScreen('play')
  }

  function finish(games) {
    setCollection(games)
    setScreen('results')
  }

  function home() {
    setScreen('home')
    setMode(null)
    setConsoleName('')
    setCollection([])
  }

  if (screen === 'console') return <ConsoleSelect onChoose={chooseConsole} onBack={home} />
  if (screen === 'play') return <GameSelection key={`${mode}-${consoleName}-${challenges[0]?.genre}`} mode={mode} consoleName={consoleName} challenges={challenges} onFinish={finish} onQuit={home} />
  if (screen === 'results') return <Results collection={collection} mode={mode} onAgain={start} onHome={home} />
  return <Home onStart={start} />
}

export default App
