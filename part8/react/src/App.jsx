import { gql } from '@apollo/client'
import { useQuery } from '@apollo/client/react'
import Persons from './components/Person'

const ALL_PERSONS = gql`
  query {
    allPersons {
      name
      phone
      id
    }
  }
`

function App() {
  const result = useQuery(ALL_PERSONS)

  if (result.loading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <Persons persons={result.data.allPersons} />
    </div>
  )
}

export default App
