import { useState } from 'react'
import Panel from './components/Panel'
import CounterContext from './CounterContext'

function App() {
  const [counter, setCounter] = useState(0)

  return (
    <CounterContext.Provider value={{counter, setCounter}}>
      <Panel />
    </CounterContext.Provider>
  )
}

export default App
