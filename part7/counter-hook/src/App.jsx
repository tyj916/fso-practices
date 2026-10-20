import useCounter from "./useCounter"

const App = () => {
  const left = useCounter()
  const right = useCounter()

  return (
    <div>
      <div>{left.value}</div>
      <button onClick={left.increase}>
        left
      </button>    
      <button onClick={right.increase}>
        right
      </button>
      <div>{right.value}</div>
    </div>
  )
}

export default App
