import { useValue } from '../store'

const Display = () => {
  const { counter } = useValue()

  return (
    <div>{counter}</div>
  )
}

export default Display
