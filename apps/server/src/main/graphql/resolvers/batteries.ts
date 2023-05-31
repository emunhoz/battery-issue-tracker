import { Query, Resolver } from 'type-graphql'
import { BatteriesModel } from '../dts/models/batteries'
import { prisma } from '../../../../prisma/client'

@Resolver()
export class BatteriesResolver {
  @Query(() => [BatteriesModel])
  async batteries() {
    return await prisma.battery.findMany()
  }
}
