import { Query, Resolver } from 'type-graphql'
import { BatteryIssuesModel } from '../dts/models/identify-battery-issues'
import { prisma } from '../../../../prisma/client'
import { groupDataBySerialNumber } from '../functions/group-data-by-serial-number'
import { NeedReplacementModel } from '../dts/models/need-replacements'
import { countAcademyIds } from '../functions/count-academy-needs-replacement'

@Resolver()
export class IdentifyBatteryIssuesResolver {
  @Query(() => [BatteryIssuesModel])
  async batteryIssues(): Promise<BatteryIssuesModel[]> {
    const data = await prisma.battery.findMany({
      orderBy: {
        timestamp: 'asc',
      },
    })

    return groupDataBySerialNumber(data)
  }

  @Query(() => [NeedReplacementModel])
  async getAcademyIdWithMostReplacements() {
    const academyIdWithMostReplacements = await this.batteryIssues()

    const onlyDevicesThatNeedToBeReplaced =
      academyIdWithMostReplacements.filter((report) => report.needReplacement)

    return await countAcademyIds(onlyDevicesThatNeedToBeReplaced)
  }
}
