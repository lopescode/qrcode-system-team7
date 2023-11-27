import { ProductIngredientsModal } from "@/components/modals/ProductIngredientsModal";
import { SignInModal } from "@/components/modals/SignInModal";
import { SignUpModal } from "@/components/modals/SignUpModal";
import { HttpRequestHelper } from "@/helpers/HTTPRequestHelper";
import { Product } from "@/types/Api";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useMemo, useState } from "react";
import { toast } from "react-toastify";

type TProductCardProps = {
  product: Product;
};

export const ProductCard = ({ product }: TProductCardProps) => {
  const [signInModalIsOpen, setSignInModalIsOpen] = React.useState(false);
  const [signUpModalIsOpen, setSignUpModalIsOpen] = React.useState(false);
  const [productIngredientsModalIsOpen, setProductIngredientsModalIsOpen] =
    useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const { data: session } = useSession();

  const accessToken = useMemo(() => {
    console.log(session);
    return session?.user.id;
  }, [session]);

  const handleProductClick = async () => {
    if (!accessToken) {
      console.log("no access token");
      console.log(accessToken);
      setSignInModalIsOpen(true);
      return;
    }

    const response = await HttpRequestHelper.get(
      `product/${product.id}/ingredients`,
      accessToken
    );

    if (!response || !response.result) {
      toast.error(response?.message ?? "Houve um erro inesperado");
      return;
    }

    setSelectedProduct(response.result[0]);
    setProductIngredientsModalIsOpen(true);
  };

  const handleSignInModalOnRequestClose = () => {
    setSignInModalIsOpen(false);
  };

  const handleSignUpModalOnRequestClose = () => {
    setSignUpModalIsOpen(false);
  };

  const handleProductIngredientsModalOnRequestClose = () => {
    setProductIngredientsModalIsOpen(false);
  };

  return (
    <button
      className="h-80 w-60 cursor-pointer overflow-hidden rounded-lg bg-black/50 transition duration-200 ease-out hover:scale-105 hover:font-semibold hover:shadow-2xl hover:shadow-orange-500/20
      hover:ease-in"
      key={product.id}
      onClick={handleProductClick}
    >
      <div className="h-full w-full">
        <div className="h-44 w-full overflow-hidden">
          <Image
            className="h-full w-full object-cover transition duration-300 ease-out hover:scale-125 hover:ease-in"
            src={product.imageUrl}
            alt={product.name}
            width={300}
            height={300}
          />
        </div>
        <div className="flex h-1/2 w-full flex-col items-center justify-between p-4">
          <div className="flex flex-col">
            <span className="text-xl text-orange-400">{product.name}</span>
            <span className="text-md text-white">{product.description}</span>
          </div>
          <span className="mb-4 text-right text-2xl font-semibold text-orange-400">
            R$ {product.price}
          </span>
        </div>
      </div>

      <SignInModal
        modalIsOpen={signInModalIsOpen}
        onRequestClose={handleSignInModalOnRequestClose}
        openSignUpModal={() => setSignUpModalIsOpen(true)}
        openIngredientsModal={() => setProductIngredientsModalIsOpen(true)}
      />

      <SignUpModal
        modalIsOpen={signUpModalIsOpen}
        onRequestClose={handleSignUpModalOnRequestClose}
        openSignInModal={() => setSignInModalIsOpen(true)}
      />

      {selectedProduct && (
        <ProductIngredientsModal
          modalIsOpen={productIngredientsModalIsOpen}
          onRequestClose={handleProductIngredientsModalOnRequestClose}
          product={selectedProduct}
        />
      )}
    </button>
  );
};
