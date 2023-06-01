import { useQuery, gql } from '@apollo/client'
import { Key, useState } from 'react'
import DeviceIcon from './icons/device-icon.svg'
import SchoolIcon from './icons/school-icon.svg'
import WarninglIcon from './icons/warning-icon.svg'
import DetailslIcon from './icons/details-icon.svg'
import './App.css'

const GET_BATTERIES = gql`
  query BatteriesIssues {
    batteryIssues {
      academyId
      devices
      totalProblems
    }
  }
`

function App() {
  const { loading, error, data } = useQuery(GET_BATTERIES)
  const [showDeitails, setDetails] = useState(false)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error : {error.message}</p>

  console.log(data, 'data')

  return (
    <main className="main">
      <h1 className="main-title">Battery issue report</h1>
      <ul>
        {data.batteryIssues.map(
          (
            report: {
              academyId: string
              devices: string[]
              totalProblems: number
            },
            index: Key | null | undefined
          ) => (
            <li key={index} className="device-list">
              {!showDeitails && (
                <>
                  <div className="device-list-wrapper">
                    <img src={SchoolIcon} alt="Academy icon" />
                    <div className="device-list-academy">
                      <label className="device-list-academy-label">
                        Academy Id
                      </label>
                      <div className="device-list-academy-value">
                        {report.academyId}
                      </div>
                    </div>
                  </div>
                  <div className="device-list-wrapper">
                    <img src={DeviceIcon} alt="Device icon" />
                    <div className="device-list-academy">
                      <label className="device-list-academy-label">
                        Device problem
                      </label>
                      <div className="device-list-academy-value">
                        {report.devices.length}
                      </div>
                    </div>
                  </div>
                  <div className="device-list-wrapper">
                    <img src={WarninglIcon} alt="Total problem icon" />
                    <div className="device-list-academy">
                      <label className="device-list-academy-label">
                        Total problem
                      </label>
                      <div className="device-list-academy-value">
                        {report.totalProblems}
                      </div>
                    </div>
                  </div>
                  <div
                    className="device-list-wrapper"
                    onClick={() => setDetails(true)}
                  >
                    <img src={DetailslIcon} alt="Total problem icon" />
                    <div className="device-list-academy">
                      <div className="device-list-academy-value">
                        More details
                      </div>
                    </div>
                  </div>
                </>
              )}
              {showDeitails && (
                <div>
                  {report.devices.map((device, index: Key) => (
                    <small key={index} className="device-list-item">
                      <img src={DeviceIcon} alt="Device error icon" /> {device}
                    </small>
                  ))}
                </div>
              )}
            </li>
          )
        )}
      </ul>
    </main>
  )
}

export default App
