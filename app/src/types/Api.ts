export type User = {
  id: number;
  firstName: string;
  lastName: string;
  addresses: UserAddress[];
  phones: UserPhone[];
};

export type UserPhone = {
  id: number;
  countryCode: string;
  areaCode: string;
  phoneNumber: string;
  userId: number;
  isDefault: boolean;
};

export type UserAddress = {
  id: number;
  streetAddress: string;
  streetNumber: string;
  neighborhood: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  complement: string;
  isDefault: boolean;
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
  userId: number | null;
  tableId: number | null;
  user: User | null;
  products: ProductOnOrder[];
};

export type IngredientOnProduct = {
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
  ingredientOnProduct: IngredientOnProduct[];
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
