import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export class IdentifyBatteryIssuesModel {
  @Field((type) => Number)
  academyId: Number

  @Field(() => Number)
  totalProblems: Number

  @Field(() => [String])
  devices: string[]
}
