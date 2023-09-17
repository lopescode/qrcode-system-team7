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

  await prisma.ingredient.createMany({
    data: [
      { name: 'Carne Moída' },
      { name: 'Queijo' },
      { name: 'Frango' },
      { name: 'Coca-Cola' },
      { name: 'Água Mineral' },
      { name: 'Peixe' },
      { name: 'Batata Frita' },
      { name: 'Bife' },
      { name: 'Arroz' },
      { name: 'Cebola' },
      { name: 'Molho de Tomate'},
      { name: 'Chocolate' },
      { name: 'Morango' },
      { name: 'Cenoura' },
      { name: 'Lasanha' },
      { name: 'Calabresa' },
      { name: 'Salada' },
      { name: 'Atum' },
      { name: 'Legumes' },
      { name: 'Sopa' },
      { name: 'Sorvete' },
      { name: 'Torta' },
    ],
  })

  await prisma.product.createMany({
    data: [
      { name: 'Pastel de Carne', description: 'Pastel de carne moída.', price: '5.00', imageUrl: '/uploads/products/pastel-de-carne.jpg', categoryId: 1 },
      { name: 'Pastel de Queijo', description: 'Pastel de queijo.', price: '5.00', imageUrl: '/uploads/products/pastel-de-queijo.jpg', categoryId: 1 },
      { name: 'Pastel de Frango', description: 'Pastel de frango.', price: '5.00', imageUrl: '/uploads/products/pastel-de-frango.jpg', categoryId: 1 },
      { name: 'Coca-Cola 2L', description: 'Refrigerante Coca-Cola 2L.', price: '10.00', imageUrl: '/uploads/products/coca-cola-2l.png', categoryId: 2 },
      { name: 'Coca-Cola 600ml', description: 'Refrigerante Coca-Cola 350Ml.', price: '5.00', imageUrl: '/uploads/products/coca-cola-350ml.webp', categoryId: 2 },
      { name: 'Agua Mineral 500ml', description: 'Água mineral 500ml.', price: '3.00', imageUrl: '/uploads/products/agua-mineral-500ml.jpg', categoryId: 2 },
      { name: 'Peixe Frito', description: 'Peixe frito com batata frita.', price: '20.00', imageUrl: '/uploads/products/peixe-frito.webp', categoryId: 3 },
      { name: 'Bife Acebolado', description: 'Bife acebolado com arroz e batata frita.', price: '20.00', imageUrl: '/uploads/products/bife-acebolado.jpg', categoryId: 3 },
      { name: 'Bife à Parmegiana', description: 'Bife à parmegiana com arroz e batata frita.', price: '20.00', imageUrl: '/uploads/products/bife-a-parmegiana.jpg', categoryId: 3 },
      { name: 'Bolo de Chocolate', description: 'Bolo de chocolate.', price: '10.00', imageUrl: '/uploads/products/bolo-de-chocolate.jpg', categoryId: 4 },
      { name: 'Bolo de Morango', description: 'Bolo de morango.', price: '10.00', imageUrl: '/uploads/products/bolo-de-morango.jpg', categoryId: 4 },
      { name: 'Bolo de Cenoura', description: 'Bolo de cenoura.', price: '10.00', imageUrl: '/uploads/products/bolo-de-cenoura.jpg', categoryId: 4 },
      { name: 'Lasanha de Frango', description: 'Lasanha de frango.', price: '20.00', imageUrl: '/uploads/products/lasanha-de-frango.jpg', categoryId: 5 },
      { name: 'Lasanha de Carne', description: 'Lasanha de carne.', price: '20.00', imageUrl: '/uploads/products/lasanha-de-carne.jpg', categoryId: 5 },
      { name: 'Lasanha de Queijo', description: 'Lasanha de queijo.', price: '20.00', imageUrl: '/uploads/products/lasanha-de-queijo.jpg', categoryId: 5 },
      { name: 'Pizza de Calabresa', description: 'Pizza de calabresa.', price: '20.00', imageUrl: '/uploads/products/pizza-de-calabresa.jpg', categoryId: 6 },
      { name: 'Pizza de Frango', description: 'Pizza de frango.', price: '20.00', imageUrl: '/uploads/products/pizza-de-frango.jpg', categoryId: 6 },
      { name: 'Pizza de Queijo', description: 'Pizza de queijo.', price: '20.00', imageUrl: '/uploads/products/pizza-de-queijo.jpg', categoryId: 6 },
      { name: 'Salada de Frango', description: 'Salada de frango.', price: '10.00', imageUrl: '/uploads/products/salada-de-frango.jpg', categoryId: 7 },
      { name: 'Salada de Atum', description: 'Salada de atum.', price: '10.00', imageUrl: '/uploads/products/salada-de-atum.jpg', categoryId: 7 },
      { name: 'Salada de Queijo', description: 'Salada de queijo.', price: '10.00', imageUrl: '/uploads/products/salada-de-queijo.jpg', categoryId: 7 },
      { name: 'Sopa de Frango', description: 'Sopa de frango.', price: '10.00', imageUrl: '/uploads/products/sopa-de-frango.jpg', categoryId: 8 },
      { name: 'Sopa de Legumes', description: 'Sopa de legumes.', price: '10.00', imageUrl: '/uploads/products/sopa-de-legumes.jpg', categoryId: 8 },
      { name: 'Sopa de Queijo', description: 'Sopa de queijo.', price: '10.00', imageUrl: '/uploads/products/sopa-de-queijo.jpg', categoryId: 8 },
      { name: 'Sorvete de Chocolate', description: 'Sorvete de chocolate.', price: '5.00', imageUrl: '/uploads/products/sorvete-de-chocolate.jpg', categoryId: 9 },
      { name: 'Sorvete de Morango', description: 'Sorvete de morango.', price: '5.00', imageUrl: '/uploads/products/sorvete-de-morango.jpg', categoryId: 9 },
      { name: 'Sorvete de Creme', description: 'Sorvete de creme.', price: '5.00', imageUrl: '/uploads/products/sorvete-de-creme.jpg', categoryId: 9 },
      { name: 'Torta de Chocolate', description: 'Torta de chocolate.', price: '10.00', imageUrl: '/uploads/products/torta-de-chocolate.jpg', categoryId: 10 },
      { name: 'Torta de Morango', description: 'Torta de morango.', price: '10.00', imageUrl: '/uploads/products/torta-de-morango.jpg', categoryId: 10 },
      { name: 'Torta de Cenoura', description: 'Torta de cenoura.', price: '10.00', imageUrl: '/uploads/products/torta-de-cenoura.jpg', categoryId: 10 },
    ],
  })
  
  const productIngredients = [
    ['Pastel de Carne', 'Carne Moída'],
    ['Pastel de Queijo', 'Queijo'],
    ['Pastel de Frango', 'Frango'],
    ['Coca-Cola 2L', 'Coca-Cola'],
    ['Coca-Cola 600ml', 'Coca-Cola'],
    ['Agua Mineral 500ml', 'Água Mineral'],
    ['Peixe Frito', 'Peixe', 'Batata Frita'],
    ['Bife Acebolado', 'Bife', 'Arroz', 'Cebola'],
    ['Bife à Parmegiana', 'Bife', 'Arroz', 'Molho de Tomate'],
    ['Bolo de Chocolate', 'Chocolate'],
    ['Bolo de Morango', 'Morango'],
    ['Bolo de Cenoura', 'Cenoura'],
    ['Lasanha de Frango', 'Lasanha', 'Frango'],
    ['Lasanha de Carne', 'Lasanha', 'Carne'],
    ['Lasanha de Queijo', 'Lasanha', 'Queijo'],
    ['Pizza de Calabresa', 'Pizza', 'Calabresa'],
    ['Pizza de Frango', 'Pizza', 'Frango'],
    ['Pizza de Queijo', 'Pizza', 'Queijo'],
    ['Salada de Frango', 'Salada', 'Frango'],
    ['Salada de Atum', 'Salada', 'Atum'],
    ['Salada de Queijo', 'Salada', 'Queijo'],
    ['Sopa de Frango', 'Sopa', 'Frango'],
    ['Sopa de Legumes', 'Sopa', 'Legumes'],
    ['Sopa de Queijo', 'Sopa', 'Queijo'],
    ['Sorvete de Chocolate', 'Sorvete', 'Chocolate'],
    ['Sorvete de Morango', 'Sorvete', 'Morango'],
    ['Sorvete de Creme', 'Sorvete', 'Creme'],
    ['Torta de Chocolate', 'Torta', 'Chocolate'],
    ['Torta de Morango', 'Torta', 'Morango'],
    ['Torta de Cenoura', 'Torta', 'Cenoura'],
  ];

  for (const [productName, ...ingredientNames] of productIngredients) {
    const product = await prisma.product.findFirst({
      where: {
        name: productName,
      },
    });

    if (product) {
      const ingredients = await prisma.ingredient.findMany({
        where: {
          name: {
            in: ingredientNames,
          },
        },
      });

      await prisma.product.update({
        where: {
          id: product.id,
        },
        data: {
          ingredients: {
            connect: ingredients.map((ingredient) => ({
              id: ingredient.id,
            })),
          },
        },
      });
    }
  }


  await prisma.orderStatus.createMany({
    data: [
      { name: 'PENDING', description: 'Pedido aguardando confirmação de preparo.' },
      { name: 'PREPARING', description: 'Pedido sendo preparado.' },
      { name: 'DELIVERED', description: 'Pedido entregue.' },
    ]
  })

  await prisma.customer.create({
    data: {
      phoneNumber: '11999999999',
      name: 'Lopes',
    }
  })

  await prisma.order.create({
    data: {
      customerId: 1,
    }
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
