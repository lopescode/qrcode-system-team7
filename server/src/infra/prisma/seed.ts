import { PrismaClient } from '@prisma/client'
import { productCategoriesSeedList, productIngredientsSeedList, productSeedList } from './constants/seed'

const prisma = new PrismaClient()

async function main(): Promise<void> {
  try {
    console.log('Seeding database...')

    console.log('Seeding product categories...')
    await prisma.productCategory.createMany({
      data: productCategoriesSeedList,
    })

    console.log('Seeding product ingredients...')
    await prisma.productIngredient.createMany({
      data: productIngredientsSeedList,
    })

    console.log('Seeding products...')
    productSeedList.forEach(async product => {
      const category = await prisma.productCategory.findUnique({
        where: {
          id: product.categoryId,
        },
      })

      if (category) {
        const productCreated = await prisma.product.create({
          data: {
            description: product.description,
            imageUrl: product.imageUrl,
            name: product.name,
            price: product.price,
            categoryId: product.categoryId,
          },
        })

        product.ingredientIds.forEach(async ingredientId => {
          const ingredient = await prisma.productIngredient.findUnique({
            where: {
              id: ingredientId,
            },
          })

          if (ingredient) {
            await prisma.ingredientOnProduct.create({
              data: {
                productId: productCreated.id,
                ingredientId: ingredient.id,
              },
            })
          }
        })
      }
    })
  } catch (error) {
    console.error(error)
    await prisma.$disconnect()
    process.exit(1)
  }
}
main()
