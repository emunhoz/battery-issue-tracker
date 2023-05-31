import { prisma } from '../../client'
import batteryData from './battery-data.json'

export function seedBattery() {
  Promise.all(
    batteryData.map(
      ({ academyId, batteryLevel, employeeId, serialNumber, timestamp }) =>
        prisma.battery.create({
          data: {
            academyId,
            batteryLevel,
            employeeId,
            serialNumber,
            timestamp,
          },
        })
    )
  )
    .then(() => console.info('[SEED] Succussfully create battery records'))
    .catch((e) => console.error('[SEED] Failed to create battery records', e))
}
