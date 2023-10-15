const API_URL = "http://localhost:3000";

export const listCategories = async () => {
  const path = `${API_URL}/product-category`;

  try {
    const response = await fetch(path);
    return response.json();
  } catch (error) {
    console.log("Error fetching categories", error);
  }
};

export const getProduct = async (productId: number) => {
  const path = `${API_URL}/product/${productId}`;

  try {
    const response = await fetch(path);
    return response.json();
  } catch (error) {
    console.log("Error fetching product", error);
  }
};

export const getOrder = async (orderId: number) => {
  const path = `${API_URL}/order/${orderId}`;

  try {
    const response = await fetch(path);
    return response.json();
  } catch (error) {
    console.log("Error fetching order", error);
  }
};

type AddProductToOrderParams = {
  orderId: number;
  productId: number;
  customerId?: number;
  tableId?: number;
  quantity: number;
};

export const addProductToOrder = async ({
  orderId,
  productId,
  customerId,
  tableId,
  quantity,
}: AddProductToOrderParams) => {
  const path = `${API_URL}/order/${orderId}`;

  try {
    const response = await fetch(path, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        customerId,
        tableId,
        quantity,
        productId,
      }),
    });

    return response.json();
  } catch (error) {
    console.log("Error adding product to order", error);
  }
};
