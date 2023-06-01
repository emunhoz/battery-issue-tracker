import { useQuery, gql } from '@apollo/client'
import { Key } from 'react'
import { DetailsIcon, DeviceIcon, SchoolIcon, WarningIcon } from '../../icons'
import { Link } from 'react-router-dom'
import './Home.style.css'

const GET_BATTERIES_ISSUES = gql`
  query BatteriesIssues {
    batteryIssues {
      academyId
      devices
      totalProblems
    }
  }
`

export const HomePage = () => {
  const { loading, error, data } = useQuery(GET_BATTERIES_ISSUES)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error : {error.message}</p>

  return (
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
          <li key={index}>
            <Link to={`report/${report.academyId}`} className="device-list">
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
                <img src={WarningIcon} alt="Total problem icon" />
                <div className="device-list-academy">
                  <label className="device-list-academy-label">
                    Total problem
                  </label>
                  <div className="device-list-academy-value">
                    {report.totalProblems}
                  </div>
                </div>
              </div>
              <div className="device-list-wrapper">
                <img src={DetailsIcon} alt="Total problem icon" />
                <div className="device-list-academy">
                  <div className="device-list-academy-value">More details</div>
                </div>
              </div>
            </Link>
            {/* {showDeitails && (
                <div>
                  {report.devices.map((device, index: Key) => (
                    <small key={index} className="device-list-item">
                      <img src={DeviceIcon} alt="Device error icon" /> {device}
                    </small>
                  ))}
                </div>
              )} */}
          </li>
        )
      )}
    </ul>
  )
}
