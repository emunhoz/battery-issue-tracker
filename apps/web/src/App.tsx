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

interface Reading {
  timestamp: string
  batteryLevel: number
}

interface BatteryData {
  academyId: number
  batteryLevel: number
  employeeId: string
  id: string
  serialNumber: string
  timestamp: string
}

interface School {
  totalProblems: number
  devices: string[]
}

function App() {
  const { loading, error, data } = useQuery(GET_BATTERIES)
  console.log(data, 'data')

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error : {error.message}</p>

  function identificarProblemasDeBateria(
    batteryData: BatteryData[]
  ): { academyId: number; totalProblems: number; devices: string[] }[] {
    const academies: {
      [key: number]: { totalProblems: number; devices: Set<string> }
    } = {}

    for (const battery of batteryData) {
      if (battery.batteryLevel < 0.3) {
        if (!academies[battery.academyId]) {
          academies[battery.academyId] = {
            totalProblems: 0,
            devices: new Set<string>(),
          }
        }

        academies[battery.academyId].totalProblems++
        academies[battery.academyId].devices.add(battery.serialNumber)
      }
    }

    return Object.entries(academies).map(
      ([academyId, { totalProblems, devices }]) => ({
        academyId: Number(academyId),
        totalProblems,
        devices: Array.from(devices),
      })
    )
  }

  // // Exemplo de uso
  // const batteryData: BatteryData[] = [
  //   {
  //     academyId: 30006,
  //     batteryLevel: 0.74,
  //     employeeId: 'T1007384',
  //     id: 'be82ad1b-77c5-41d2-a88a-cd5f3fb343d0',
  //     serialNumber: '1805C67HD02259',
  //     timestamp: '2019-05-22T16:06:05.934Z',
  //   },
  //   {
  //     academyId: 30006,
  //     batteryLevel: 0.76,
  //     employeeId: 'T1007384',
  //     id: '313cd1f7-54a9-4799-a1bd-87d3d2f37365',
  //     serialNumber: '1805C67HD02259',
  //     timestamp: '2019-05-22T15:22:14.287Z',
  //   },
  // ]

  const resultado = identificarProblemasDeBateria(data.batteries)
  console.log(resultado)

  return (
    <>
      <h1>Hello world</h1>
    </>
  )
}

export default App
