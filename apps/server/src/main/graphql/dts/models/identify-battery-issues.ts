import { Field, Int, ObjectType } from 'type-graphql'

@ObjectType()
export class DatesEntry {
  @Field(() => String)
  day: string

  @Field(() => [Number])
  batteryLevels: number[]

  @Field(() => String)
  averageDailyUsage: string

  @Field(() => Int, { nullable: true })
  academyId: number

  @Field(() => Boolean)
  wasRecharged: boolean
}

@ObjectType()
export class BatteryIssuesModel {
  @Field(() => String)
  serialNumber: string

  @Field(() => Int, { nullable: true })
  academyId: number

  @Field(() => Boolean)
  needReplacement: boolean

  @Field(() => [DatesEntry])
  dates: DatesEntry[]
}
