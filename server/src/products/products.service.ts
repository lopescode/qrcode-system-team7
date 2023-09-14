import { Injectable } from '@nestjs/common';
import { type Product } from '@prisma/client';
import { PrismaService } from '../infra/prisma/prisma.service';
import { type CreateProductDto } from './dto/create-product.dto';
import { type UpdateProductDto } from './dto/update-product.dto';
import { ProductNotFoundException } from '../exceptions/NotFoundExceptions';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    { name, categoryName, ingredientsName, description }: CreateProductDto,
    imagePath: string,
  ): Promise<Product> {
    const category = await this.prisma.category.upsert({
      create: {
        name: categoryName,
      },
      update: {},
      where: {
        name: categoryName,
      },
    });

    const ingredients = await Promise.all(
      ingredientsName.map(async (ingredientName) => {
        return this.prisma.ingredient.upsert({
          create: {
            name: ingredientName,
          },
          update: {},
          where: {
            name: ingredientName,
          },
        });
      }),
    );

    const product = await this.prisma.product.upsert({
      create: {
        name,
        imageUrl: imagePath,
        category: {
          connectOrCreate: {
            where: {
              id: category.id,
            },
            create: {
              name: category.name,
            },
          },
        },
        ingredients: {
          connect: ingredients.map((ingredient) => ({ id: ingredient.id })),
        },
        description,
      },
      include: {
        category: true,
        ingredients: true,
      },
      update: {},
      where: {
        name,
      },
    });

    return product;
  }

  async findAll(): Promise<Product[]> {
    return await this.prisma.product.findMany({
      include: {
        category: true,
        ingredients: true,
      },
    });
  }

  async findOne(id: number): Promise<Product | null> {
    const product = await this.prisma.product.findUnique({
      where: {
        id,
      },
      include: {
        category: true,
        ingredients: true,
      },
    });

    if (!product) {
      throw new ProductNotFoundException(id);
    }

    return product;
  }

  async update(
    id: number,
    { ingredientsName, categoryName, description, name }: UpdateProductDto,
  ): Promise<Product> {
    const ingredients = ingredientsName
      ? await Promise.all(
          ingredientsName.map(async (ingredientName) => {
            return this.prisma.ingredient.upsert({
              create: {
                name: ingredientName,
              },
              update: {},
              where: {
                name: ingredientName,
              },
            });
          }),
        )
      : [];

    const category = categoryName
      ? await this.prisma.category.upsert({
          create: {
            name: categoryName,
          },
          update: {},
          where: {
            name: categoryName,
          },
        })
      : undefined;

    const product = await this.prisma.product.findUnique({
      where: {
        id,
      },
    });

    if (!product) {
      throw new ProductNotFoundException(id);
    }

    return await this.prisma.product.update({
      data: {
        description,
        name,
        ingredients: {
          connect: ingredients.map((ingredient) => ({ id: ingredient.id })),
        },
        category: {
          connect: {
            id: category?.id,
          },
        },
      },
      where: {
        id,
      },
    });
  }

  async remove(id: number): Promise<Product> {
    const product = await this.prisma.product.findUnique({
      where: {
        id,
      },
    });

    if (!product) {
      throw new ProductNotFoundException(id);
    }

    return await this.prisma.product.delete({
      where: {
        id,
      },
    });
  }
}
