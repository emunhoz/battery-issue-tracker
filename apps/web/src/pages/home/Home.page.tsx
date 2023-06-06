import { useQuery } from '@apollo/client'
import { useState } from 'react'
import { DetailsIcon, DeviceIcon, SchoolIcon, WarningIcon } from '../../icons'
import { GET_BATTERIES_ISSUES } from './queries/batteries-issues'
import './Home.style.css'

export const HomePage = () => {
  const { loading, error, data } = useQuery(GET_BATTERIES_ISSUES)
  const [showDetails, setDetails] = useState<{ [id: string]: boolean }>({})

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error : {error.message}</p>

  function handleSelect(id: string) {
    setDetails((state) => ({
      ...state,
      [id]: !state[id],
    }))
  }

  return (
    <ul>
      {data.getAcademyIdWithMostReplacements.map(
        (report: {
          academyId: string
          devices: string[]
          totalReplacements: number
        }) => (
          <li key={report.academyId} data-testid={report.academyId}>
            <div className="device-list">
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
                <img src={WarningIcon} alt="Total problem icon" />
                <div className="device-list-academy">
                  <label className="device-list-academy-label">
                    Total problem
                  </label>
                  <div className="device-list-academy-value">
                    {report.totalReplacements}
                  </div>
                </div>
              </div>
              <div
                className="device-list-wrapper"
                onClick={() => handleSelect(report.academyId)}
              >
                <img src={DetailsIcon} alt="Total problem icon" />
                <div className="device-list-academy">
                  <div className="device-list-academy-value">
                    {showDetails[report.academyId] ? 'Close' : 'Details'}
                  </div>
                </div>
              </div>
            </div>
            {showDetails[report.academyId] && (
              <div className="details">
                {report.devices.map((device) => (
                  <small key={device} className="device-list-item">
                    <img src={DeviceIcon} alt="Device error icon" /> {device}
                  </small>
                ))}
              </div>
            )}
          </li>
        )
      )}
    </ul>
  )
}
