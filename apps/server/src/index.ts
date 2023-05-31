import { prisma } from '../prisma/client'

async function main() {
  const allBatteries = await prisma.battery.findMany()
  console.log(allBatteries, 'battery')
  console.log(allBatteries.length, 'battery.size')
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
