import { Field, ID, ObjectType } from 'type-graphql'

@ObjectType()
export class BatteriesModel {
  @Field((type) => ID)
  id: string

  @Field((type) => Number)
  academyId: Number

  @Field(() => Number)
  batteryLevel: Number

  @Field(() => String)
  employeeId: string

  @Field(() => String)
  serialNumber: string

  @Field(() => Date)
  timestamp: Date
}
