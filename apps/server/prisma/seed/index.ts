import { prisma } from '../client'
import { seedBattery } from './battery'

async function main() {
  console.info('Starting to read seeds...')
  seedBattery()
  console.info('Database populated!')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
