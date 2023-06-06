import { BatteryIssuesModel } from '../dts/models/identify-battery-issues'
import { DatesEntry } from '../dts/models/identify-battery-issues'
import dayjs from 'dayjs'

export interface BatteryRequestProps {
  academyId: number
  batteryLevel: number
  employeeId: string
  serialNumber: string
  timestamp: Date
}

export function groupDataBySerialNumber(
  data: BatteryRequestProps[]
): BatteryIssuesModel[] {
  const groupedData: { [serialNumber: string]: DatesEntry[] } = {}

  for (const item of data) {
    const { serialNumber, timestamp, batteryLevel, academyId } = item
    const day = dayjs(timestamp).format('DD/MM/YYYY')

    if (!groupedData[serialNumber]) {
      groupedData[serialNumber] = []
    }

    const entry = groupedData[serialNumber].find((entry) => entry.day === day)

    if (entry) {
      entry.batteryLevels.push(batteryLevel)
    } else {
      groupedData[serialNumber].push({
        day,
        batteryLevels: [batteryLevel],
        academyId,
        wasRecharged: false,
        averageDailyUsage: 'unknown',
      })
    }
  }

  const result: BatteryIssuesModel[] = []

  for (const serialNumber in groupedData) {
    const dates = groupedData[serialNumber]
    let needReplacement = false

    for (const date of dates) {
      const { batteryLevels } = date
      const totalBatteryLevels = batteryLevels.length

      if (totalBatteryLevels > 1) {
        const hasIncrease = batteryLevels
          .slice(1)
          .some((level, index) => level > batteryLevels[index])
        const filteredBatteryLevels = batteryLevels.filter(
          (_, index) =>
            index === 0 || batteryLevels[index] <= batteryLevels[index - 1]
        )

        if (hasIncrease) {
          date.batteryLevels = filteredBatteryLevels
          date.wasRecharged = true
          date.averageDailyUsage = 'unknown'
        } else {
          const firstBatteryLevel = filteredBatteryLevels[0]
          const lastBatteryLevel =
            filteredBatteryLevels[filteredBatteryLevels.length - 1]
          const percentageUsage =
            ((firstBatteryLevel - lastBatteryLevel) / firstBatteryLevel) * 100
          date.averageDailyUsage = `${percentageUsage.toFixed(2)}%`

          if (percentageUsage > 30) {
            needReplacement = true
          }
        }
      }
    }

    result.push({
      academyId: Number(dates[0].academyId),
      serialNumber,
      needReplacement,
      dates,
    })
  }

  return result
}
