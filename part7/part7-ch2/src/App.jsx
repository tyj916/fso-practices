import { useState } from "react"
import useCounter from "./useCounter"
import useField from "./useField"

const App = () => {
  const left = useCounter()
  const right = useCounter()

  const name = useField('text')
  const [born, setBorn] = useState('')
  const [height, setHeight] = useState('')

  return (
    <div>
      <h2>Form field hook</h2>
      <form>
        name: 
        <input {...name} /> 
        <br/> 
        birthdate:
        <input
          type='date'
          value={born}
          onChange={(event) => setBorn(event.target.value)}
        />
        <br /> 
        height:
        <input
          type='number'
          value={height}
          onChange={(event) => setHeight(event.target.value)}
        />
      </form>
      <div>
        {name.value} {born} {height} 
      </div>

      <h2>Counter hook</h2>
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
