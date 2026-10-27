import { useState } from 'react'
import { useQuery } from '@apollo/client/react'
import PersonForm from './components/PersonForm'
import Persons from './components/Person'
import Notify from './components/Notify'
import { ALL_PERSONS } from './queries'

function App() {
  const [errorMessage, setErrorMessage] = useState(null)

  const result = useQuery(ALL_PERSONS)

  if (result.loading) {
    return <div>Loading...</div>
  }

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  return (
    <div>
      <Notify errorMessage={errorMessage} />
      <Persons persons={result.data.allPersons} />
      <PersonForm setError={notify} />
    </div>
  )
}

export default App
