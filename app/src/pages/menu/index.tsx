import { Banner } from "@/components/Banner";
import { CategoryCard } from "@/components/CategoryCard";
import { ProductCard } from "@/components/ProductCard";
import SelectProductIngredientsModal from "@/components/SelectProductIngredientsModal";
import SignInModal from "@/components/SignInModal";
import SignUpModal from "@/components/SignUpModal";
import CustomerContext from "@/contexts/CustomerContext";
import OrderContext from "@/contexts/OrderContext";
import { isTabletUser } from "@/hooks/isTabletUser";
import {
  Customer,
  IngredientsOnProduct,
  Order,
  Product,
  ProductCategory,
  Table,
} from "@/models";
import { Api } from "@/shared/api";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { toast } from "react-toastify";

const Menu: React.FC = () => {
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [ingredients, setIngredients] = useState<IngredientsOnProduct[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product>();
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>();
  const [
    selectProductIngredientsModalIsOpen,
    setSelectProductIngredientsModalIsOpen,
  ] = useState(false);
  const [signInModalIsOpen, setSignInModalIsOpen] = useState(false);
  const [signUpModalIsOpen, setSignUpModalIsOpen] = useState(false);

  const { customer, setCustomer } = useContext(CustomerContext);
  const { order, setOrder } = useContext(OrderContext);

  useEffect(() => {
    Api.get<ProductCategory[]>("product-category").then((categoriesFetched) => {
      if (categoriesFetched) {
        setCategories(categoriesFetched);
      }
    });
  }, []);

  const openSelectProductIngredientsModal = () => {
    setSelectProductIngredientsModalIsOpen(true);
  };

  const closeSelectProductIngredientsModal = () => {
    setSelectProductIngredientsModalIsOpen(false);
  };

  const openSignInModal = () => {
    setSignInModalIsOpen(true);
  };

  const closeSignInModal = () => {
    setSignInModalIsOpen(false);
  };

  const openSignUpModal = () => {
    setSignUpModalIsOpen(true);
  };

  const closeSignUpModal = () => {
    setSignUpModalIsOpen(false);
  };

  const handleSignInSubmit = async (data: any) => {
    const customerFetched = await Api.post<Customer>("customer/login", data);

    if (customerFetched) {
      toast("Logado com sucesso!", {
        hideProgressBar: true,
        autoClose: 2000,
        type: "success",
      });

      setCustomer(customerFetched);

      const orderFetched = await Api.post<Order>("order", {
        customerId: customerFetched.id,
      });

      if (orderFetched) {
        setOrder(orderFetched);
      }
    }

    closeSignInModal();
    closeSelectProductIngredientsModal();
  };

  const handleSignUpSubmit = async (data: any) => {
    const customerFetched = await Api.post<Customer>("customer", data);

    if (customerFetched) {
      toast("Cadastrado com sucesso!", {
        hideProgressBar: true,
        autoClose: 2000,
        type: "success",
      });

      setCustomer(customerFetched);

      const orderFetched = await Api.post<Order>("order", {
        customerId: customerFetched.id,
      });

      if (orderFetched) {
        setOrder(orderFetched);
      }
    }

    closeSignUpModal();
  };

  const handleSignInClick = () => {
    closeSignUpModal();
    openSignInModal();
  };

  const handleSignUpClick = () => {
    closeSignInModal();
    openSignUpModal();
  };

  const handleSelectProductClick = async () => {
    if (!selectedProduct) {
      closeSelectProductIngredientsModal();
      return;
    }

    if (!order.id && !customer.id) {
      if (!isTabletUser()) {
        openSignInModal();
        return;
      }

      const tables = await Api.get<Table[]>("table");
      if (!tables) {
        toast("Não há mesas cadastradas", {
          autoClose: 2000,
          type: "error",
          hideProgressBar: true,
        });
        return;
      }

      const tablesAvailable = tables.filter(
        (table) => table.isAvailable === true
      );
      if (!tablesAvailable) {
        toast("Não há mesas disponíveis", {
          autoClose: 2000,
          type: "error",
          hideProgressBar: true,
        });
        return;
      }

      const table = tablesAvailable[0];
      const orderFetched = await Api.post<Order>("order", {
        tableId: table.id,
      });

      if (orderFetched) {
        setOrder(orderFetched);

        toast("Produto adicionado ao pedido!", {
          hideProgressBar: true,
          autoClose: 2000,
          type: "success",
        });
      }
    }

    const orderUpdated = await Api.post<Order>(
      `order/${order.id}/add-product`,
      {
        productId: selectedProduct.id,
      }
    );

    if (orderUpdated) {
      toast("Produto adicionado ao pedido!", {
        hideProgressBar: true,
        autoClose: 2000,
        type: "success",
      });

      setOrder(orderUpdated);
    }

    closeSelectProductIngredientsModal();
  };

  const handleCategoryClick = async (category: ProductCategory) => {
    setSelectedCategory(category);
    setProducts(category.products);
  };

  const handleProductClick = async (productId: number) => {
    const selectedProduct = await Api.get<Product>(`product/${productId}`);

    if (selectedProduct) {
      setSelectedProduct(selectedProduct);
      setIngredients(selectedProduct.ingredients);
    }

    if (!order && !customer) {
      openSignInModal();
    } else {
      openSelectProductIngredientsModal();
    }
  };

  return (
    <div className="h-full w-full">
      <div className="flex items-center p-4">
        <Link href="/">
          <FaArrowLeft className="cursor-pointer w-8 h-10 mr-10 text-white hover:text-orange-600" />
        </Link>
        <div className="flex gap-6">
          {categories.length &&
            categories.length > 0 &&
            categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryClick(category)}
              >
                <div
                  className={`cursor-pointer rounded-sm border-2 ${
                    selectedCategory?.id === category.id
                      ? "border-orange-600 bg-orange-600 font-semibold"
                      : "border-gray-400 hover:bg-orange-700 hover:border-orange-700 hover:font-semibold"
                  }`}
                >
                  <p className="text-white text-sm px-6 py-2">
                    {category.name.toUpperCase()}
                  </p>
                </div>
              </button>
            ))}
        </div>
      </div>

      {!selectedCategory ? (
        <>
          <Banner />
          <div className="flex flex-wrap gap-7 p-4">
            {categories.length &&
              categories.length > 0 &&
              categories.map((category) => (
                <CategoryCard
                  handleCategoryClick={handleCategoryClick}
                  category={category}
                />
              ))}
          </div>
        </>
      ) : (
        <div className="flex flex-wrap gap-7 p-4">
          {products.length &&
            products.length > 0 &&
            products.map((product) => (
              <ProductCard
                handleProductClick={() => handleProductClick(product.id)}
                product={product}
              />
            ))}

          {selectedProduct && (
            <SelectProductIngredientsModal
              isOpen={selectProductIngredientsModalIsOpen}
              onRequestClose={closeSelectProductIngredientsModal}
              selectedProduct={selectedProduct}
              handleSelectProductClick={handleSelectProductClick}
              ingredients={ingredients}
            />
          )}

          <SignInModal
            isOpen={signInModalIsOpen}
            onRequestClose={closeSignInModal}
            onSubmit={handleSignInSubmit}
            handleSignUpClick={handleSignUpClick}
          />

          <SignUpModal
            isOpen={signUpModalIsOpen}
            onRequestClose={closeSignUpModal}
            onSubmit={handleSignUpSubmit}
            handleSignInClick={handleSignInClick}
          />
        </div>
      )}
    </div>
  );
};

export default Menu;
