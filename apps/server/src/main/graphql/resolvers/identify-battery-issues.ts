import { Arg, Int, Query, Resolver } from 'type-graphql'
import { IdentifyBatteryIssuesModel } from '../dts/models/identify-battery-issues'
import { prisma } from '../../../../prisma/client'

@Resolver()
export class IdentifyBatteryIssuesResolver {
  @Query(() => [IdentifyBatteryIssuesModel])
  async batteryIssues(
    @Arg('academyId', (type) => Int, { nullable: true }) academyId?: number
  ): Promise<IdentifyBatteryIssuesModel[]> {
    const batteryData = await prisma.battery.findMany()
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

    const findBatteries = Object.entries(academies).map(
      ([academyId, { totalProblems, devices }]) => ({
        academyId: Number(academyId),
        totalProblems,
        devices: Array.from(devices),
      })
    )

    return academyId
      ? findBatteries.filter((item) => item.academyId === academyId)
      : findBatteries
  }
}
