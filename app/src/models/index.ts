export type Customer = {
  id: number;
  firstName: string;
  lastName: string;
};

export type ProductOnOrder = {
  productId: number;
  quantity: number;
  orderId: number;
  product: Product;
};

export type Order = {
  id: number;
  createdAt: string;
  price: string;
  paymentStatus: string;
  customerId: number | null;
  tableId: number | null;
  customer: Customer | null;
  products: ProductOnOrder[];
};

export type IngredientsOnProduct = {
  productId: number;
  ingredientId: number;
  createdAt: string;
  ingredient: ProductIngredient;
};

export type Product = {
  id: number;
  name: string;
  description: string;
  price: string;
  imageUrl: string;
  categoryId: number;
  ingredients: IngredientsOnProduct[];
};

export type ProductCategory = {
  id: number;
  name: string;
  imageUrl: string;
  description: string;
  products: Product[];
};

export type ProductIngredient = {
  id: number;
  name: string;
  description: string;
};

export type Table = {
  id: number;
  number: number;
  isAvailable: boolean;
};
