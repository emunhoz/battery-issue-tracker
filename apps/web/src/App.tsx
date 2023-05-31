import { useQuery, gql } from '@apollo/client'

const GET_BATTERIES = gql`
  query Batteries {
    batteries {
      academyId
      batteryLevel
      employeeId
      id
      serialNumber
      timestamp
    }
  }
`

function App() {
  const { loading, error, data } = useQuery(GET_BATTERIES)
  console.log(data, 'data')

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error : {error.message}</p>

  return (
    <>
      <h1>Hello world</h1>
    </>
  )
}

export default App
