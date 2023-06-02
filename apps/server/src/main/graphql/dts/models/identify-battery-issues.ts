import { Field, Int, ObjectType } from 'type-graphql'

@ObjectType()
export class IdentifyBatteryIssuesModel {
  @Field((type) => Int)
  academyId: number

  @Field(() => Int)
  totalProblems: number

  @Field(() => [String])
  devices: string[]
}
