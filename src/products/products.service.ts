import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async create({name, imageUrl, categoryName, ingredientsName, description}: CreateProductDto) {
    const category = await this.prisma.category.create({
      data: {
        name: categoryName
      }
    })    

    const ingredientIds = []

    for (const ingredient of ingredientsName) {
      const {id} = await this.prisma.ingredient.create({
        data: {
          name: ingredient,
        }
      })

      ingredientIds.push(id)
    }

    const product = await this.prisma.product.create({
      data: {
        name,
        imageUrl,
        category: {
          connectOrCreate: {
            where: {
              id: category.id
            },
            create: {
              name: category.name,
            }
          }
        },
        ingredients: {
          connect: ingredientIds.map(ingredientId => ({ id: ingredientId }))
        },
        description,
      },
      include: {
        category: true,
        ingredients: true
      }
    })

    return product
  }

  async findAll() {
    return await this.prisma.product.findMany({
      include: {
        category: true,
        ingredients: true
      }
    });
  }

  async findOne(id: number) {
    return await this.prisma.product.findFirst({
      where: {
        id
      },
      include: {
        category: true,
        ingredients: true
      }
    });
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const ingredientIds = []

    if (updateProductDto.ingredientsName) {
      for (const ingredient of updateProductDto.ingredientsName) {
        const {id} = await this.prisma.ingredient.create({
          data: {
            name: ingredient,
          }
        })
  
        ingredientIds.push(id)
      }
    }
    let category

    if (updateProductDto.categoryName) {
      category = await this.prisma.category.create({
        data: {
          name: updateProductDto.categoryName
        }
      })    
    }


    return await this.prisma.product.update({
      data: {
        description: updateProductDto.description,
        name: updateProductDto.name,
        ingredients: {
          connect: ingredientIds.map(ingredientId => ({ id: ingredientId }))
        },
        category: {
          connect: {
            id: category.id
          }
        },
        imageUrl: updateProductDto.imageUrl
      },
      where: {
        id
      }
    });
  }

  async remove(id: number) {
    return await this.prisma.product.delete({
      where: {
        id
      }
    });
  }
}
