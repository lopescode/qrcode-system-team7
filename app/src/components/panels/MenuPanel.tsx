import { CategoryCard } from "@/components/cards/CategoryCard";
import { HttpRequestHelper } from "@/helpers/HTTPRequestHelper";
import { Product, ProductCategory } from "@/types/Api";
import { IconArrowRight } from "@tabler/icons-react";
import { useSession } from "next-auth/react";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { ProductCard } from "../cards/ProductCard";
import { ProductModal } from "../modals/ProductModal";
import { SignInModal } from "../modals/SignInModal";
import { SignUpModal } from "../modals/SignUpModal";

export const MenuPanel = () => {
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>();
  const [signInModalIsOpen, setSignInModalIsOpen] = useState(false);
  const [signUpModalIsOpen, setSignUpModalIsOpen] = useState(false);
  const [productModalIsOpen, setProductModalIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const { data: session } = useSession();

  const accessToken = useMemo(() => {
    return session?.user.access_token;
  }, [session]);

  const handleProductClick = async (product: Product) => {
    if (!accessToken) {
      setSignInModalIsOpen(true);
      return;
    }

    setSelectedProduct(product);
    setProductModalIsOpen(true);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await HttpRequestHelper.get(
        "product-category?includeProducts=true"
      );

      if (!response || !response.result) {
        toast.error(response?.message ?? "Houve um erro inesperado");
        return;
      }

      setCategories(response.result);
    };
    fetchCategories();
  }, []);

  const handleSignInModalOnRequestClose = () => {
    setSignInModalIsOpen(false);
  };

  const handleSignUpModalOnRequestClose = () => {
    setSignUpModalIsOpen(false);
  };

  const handleProductModalOnRequestClose = () => {
    setProductModalIsOpen(false);
  };

  return (
    <div className="flex flex-col gap-10 p-6">
      <div
        className="
      flex items-center justify-center gap-2 text-4xl font-medium"
      >
        <span>Cardápio</span>
        <IconArrowRight width={32} height={32} />
        <span>
          {selectedCategory ? `${selectedCategory.name}` : "Categorias"}
        </span>
      </div>
      <hr />
      <div className="flex flex-wrap gap-6 pb-20">
        {!selectedCategory
          ? categories.map((category) => (
              <CategoryCard
                handleCategoryClick={() => setSelectedCategory(category)}
                category={category}
                key={category.id}
              />
            ))
          : selectedCategory.products.map((product) => (
              <ProductCard
                product={product}
                key={product.id}
                handleProductClick={handleProductClick}
              />
            ))}
      </div>

      <SignInModal
        modalIsOpen={signInModalIsOpen}
        onRequestClose={handleSignInModalOnRequestClose}
        openSignUpModal={() => setSignUpModalIsOpen(true)}
        openProductModal={() => setProductModalIsOpen(true)}
      />

      <SignUpModal
        modalIsOpen={signUpModalIsOpen}
        onRequestClose={handleSignUpModalOnRequestClose}
        openSignInModal={() => setSignInModalIsOpen(true)}
      />

      {selectedProduct && productModalIsOpen && (
        <ProductModal
          modalIsOpen={productModalIsOpen}
          onRequestClose={handleProductModalOnRequestClose}
          product={selectedProduct}
        />
      )}
    </div>
  );
};
