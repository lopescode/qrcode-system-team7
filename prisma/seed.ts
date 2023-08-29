import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
async function main() {
  await prisma.ingredient.createMany({
    data:[
      {name: "Carne"},
      {name: "Rúcula fresca"},
      {name: "Massa de pizza"},
      {name: "Queijo"},
      {name: "Molho"},
      {name: "Pão"},
      {name: "Refrigerante"}    
    ]
  })
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
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })