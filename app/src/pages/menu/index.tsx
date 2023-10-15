import { Banner } from "@/components/Banner";
import { CategoryCard } from "@/components/CategoryCard";
import { ProductCard } from "@/components/ProductCard";
import SelectProductIngredientsModal from "@/components/SelectProductIngredientsModal";
import { Product, ProductCategory, ingredientsOnProduct } from "@/models";
import { addProductToOrder, getProduct, listCategories } from "@/shared/api";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";

const Menu: React.FC = () => {
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [ingredients, setIngredients] = useState<ingredientsOnProduct[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product>();
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    async function fetch() {
      const categories = await listCategories();

      setCategories(categories);
    }

    fetch();
  }, []);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleSelectProductClick = async (productId: number) => {
    await addProductToOrder({
      orderId: 1,
      productId,
      quantity: 1,
      customerId: 1,
    });

    alert("Produto adicionado ao carrinho!");
    closeModal();
  };

  const handleCategoryClick = async (category: ProductCategory) => {
    setSelectedCategory(category);
    setProducts(category.products);
  };

  const handleProductClick = async (productId: number) => {
    const selectedProduct = await getProduct(productId);

    setSelectedProduct(selectedProduct);
    setIngredients(selectedProduct.ingredients);
    openModal();
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
              isOpen={modalIsOpen}
              onRequestClose={closeModal}
              selectedProduct={selectedProduct}
              handleSelectProductClick={handleSelectProductClick}
              ingredients={ingredients}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Menu;
