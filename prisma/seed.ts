import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main (): Promise<void> {
  for (let i = 0; i < 11; i++) {
    await prisma.table.create({
      data: {
        number: i
      }
    })
  }
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async e => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
