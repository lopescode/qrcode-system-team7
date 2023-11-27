import { CategoryCard } from "@/components/cards/CategoryCard";
import { HttpRequestHelper } from "@/helpers/HTTPRequestHelper";
import { ProductCategory } from "@/types/Api";
import { IconArrowRight } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { ProductCard } from "../cards/ProductCard";

export const MenuCategoriesPanel = () => {
  const [categories, setCategories] = useState<ProductCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>();

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
              <ProductCard product={product} key={product.id} />
            ))}
      </div>
    </div>
  );
};
