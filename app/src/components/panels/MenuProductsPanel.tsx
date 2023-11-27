import { ProductCard } from "@/components/cards/ProductCard";
import { HttpRequestHelper } from "@/helpers/HTTPRequestHelper";
import { Product } from "@/types/Api";
import { IconArrowRight } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export const MenuProductsPanel = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await HttpRequestHelper.get("product");
      if (!response || !response.result) {
        toast.error(response?.message ?? "Houve um erro inesperado");
        return;
      }

      setProducts(response.result);
    };
    fetchProducts();
  }, []);

  return (
    <div className="flex h-full w-full flex-col gap-10 p-6">
      <div className="flex items-center justify-center gap-2 text-4xl font-medium">
        <span>Cardápio</span>
        <IconArrowRight width={32} height={32} />
        <span>Todos os produtos</span>
      </div>
      <hr />
      <div className="flex flex-wrap gap-6 pb-20">
        {products.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
    </div>
  );
};
