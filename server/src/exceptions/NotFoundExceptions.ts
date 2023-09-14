import { NotFoundException } from '@nestjs/common';

export class ProductNotFoundException extends NotFoundException {
  constructor(productId: number) {
    super(`Product with ID ${productId} not found`);
  }
}
