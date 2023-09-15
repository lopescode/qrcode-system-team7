import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main(): Promise<void> {
  await prisma.category.createMany({
    data: [
      { name: 'Aperitivos', description: 'Pastéis, coxinhas, bolinhos, etc.', imageUrl: '/uploads/categories/aperitivos.webp' },
      { name: 'Bebidas', description: 'Refrigerantes, sucos, água, cerveja, etc.',  imageUrl: '/uploads/categories/bebidas.jpg' },
      { name: 'Carnes', description: 'Carnes bovinas, suínas, aves, peixes, etc.' , imageUrl: '/uploads/categories/carnes.webp' },
      { name: 'Doces', description: 'Sobremesas, bolos, tortas, etc.', imageUrl: '/uploads/categories/doces.jpg' },
      { name: 'Massas', description: 'Macarrão, lasanha, etc.', imageUrl: '/uploads/categories/massas.jpg' },
      { name: 'Pizzas', description: 'Pizzas de diversos sabores.', imageUrl: '/uploads/categories/pizzas.jpg' },
      { name: 'Saladas', description: 'Saladas de diversos tipos.', imageUrl: '/uploads/categories/saladas.jpg' },
      { name: 'Sopas', description: 'Sopas de diversos sabores.', imageUrl: '/uploads/categories/sopas.jpg' },
      { name: 'Sorvetes', description: 'Sorvetes de diversos sabores.', imageUrl: '/uploads/categories/sorvetes.jpg' },
      { name: 'Tortas', description: 'Tortas de diversos sabores.', imageUrl: '/uploads/categories/tortas.jpg' },
    ],
  })

  
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
