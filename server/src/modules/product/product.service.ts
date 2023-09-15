import { BadRequestException, Injectable } from '@nestjs/common';
import { type Product } from '@prisma/client';
import { PrismaService } from '../../infra/prisma/prisma.service';
import { type CreateProductDto } from './dto/create-product.dto';
import { type UpdateProductDto } from './dto/update-product.dto';
import { ProductNotFoundException } from '../../exceptions/NotFoundExceptions';
import { ImageHelper } from 'src/helpers/imageHelper';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    { name, categoryName, ingredientsName, description, price, imageFile }: CreateProductDto
  ): Promise<Product> {
    const productExists = await this.prisma.product.findUnique({
      where: {
        name,
      },
    });

    if (productExists) throw new BadRequestException('Product already exists');

    const category = await this.prisma.category.findUnique({
      where: {
        name: categoryName,
      },
    });
    
    if (!category) throw new BadRequestException('Category not found');

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

    const imagePath = await ImageHelper.uploadImage(imageFile, 'products');

    return await this.prisma.product.create({
      data: {
        name,
        imageUrl: imagePath,
        price,
        category: {
          connect: {
            id: category.id,
          },
        },
        ingredients: {
          connect: ingredients.map((ingredient) => ({ id: ingredient.id })),
        },
        description,
      }
    });
  }

  async findAll(): Promise<Product[]> {
    return await this.prisma.product.findMany({
      include: {
        ingredients: true,
      }
    });
  }

  async findOne(id: number): Promise<Product | null> {
    const product = await this.prisma.product.findUnique({
      where: {
        id,
      },
      include: {
        ingredients: true,
      }
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
    const category = await this.prisma.category.findUnique({
      where: {
        name: categoryName,
      },
    });
    
    if (!category) throw new BadRequestException('Category not found');

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
            id: category.id,
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
