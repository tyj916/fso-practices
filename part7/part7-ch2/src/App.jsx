import useCounter from "./useCounter"
import useField from "./useField"

const App = () => {
  const left = useCounter()
  const right = useCounter()

  const name = useField('text')
  const born = useField('date')
  const height = useField('text')

  return (
    <div>
      <h2>Form field hook</h2>
      <form>
        name: 
        <input {...name} /> 
        <br/> 
        birthdate:
        <input {...born} />
        <br /> 
        height:
        <input {...height} />
      </form>
      <div>
        {name.value} {born.value} {height.value} 
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
