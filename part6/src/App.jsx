import Display from './components/Display'
import useCounterStore from './store'

function App() {
  const increment = useCounterStore(state => state.increment)
  const decrement = useCounterStore(state => state.decrement)
  const zero = useCounterStore(state => state.zero)

  return (
    <div>
      <Display />
      <div>
        <button onClick={increment}>plus</button>
        <button onClick={decrement}>minus</button>
        <button onClick={zero}>zero</button>
      </div>
    </div>
  )
}

export default App
