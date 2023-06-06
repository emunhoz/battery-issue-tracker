import { ObjectType, Field } from 'type-graphql'

@ObjectType()
export class NeedReplacementModel {
  @Field(() => String)
  academyId: string

  @Field(() => Number)
  totalReplacements: number

  @Field(() => [String])
  devices: string[]
}
