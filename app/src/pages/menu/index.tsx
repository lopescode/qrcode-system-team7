import React, { useState, useEffect } from 'react';
import Link from 'next/link'
import { FaArrowLeft } from 'react-icons/fa';
import { Banner } from '@/components/Banner';
import SelectProductIngredientsModal from '@/components/modal/SelectProductIngredientsModal';
import { CategoryCard } from '@/components/card/CategoryCard';
import { ProductCard } from '@/components/card/ProductCard';

type CategoryItems = {
  id: number
  name: string
  description: string
  imageUrl: string
}

type ProductItems = {
  id: number
  name: string
  description: string
  price: string
  imageUrl: string
  ingredients: string[]
}


const Menu: React.FC = () => {
  const [categoryItems, setCategoryItems] = useState<CategoryItems[]>([]);
  const [productItems, setProductItems] = useState<ProductItems[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<ProductItems>();
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number>();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const proceedEvent = () => {
    alert('Produto adicionado ao carrinho!')
    closeModal()
  };

  useEffect(() => {
    const fetchCategoryItems = async () => {
      try {
        const response = await fetch('http://localhost:3000/category');
        const data = await response.json();
        setCategoryItems(data);
      } catch (error) {
        console.error('Error fetching menu items:', error);
      }
    };
    fetchCategoryItems();
  }, []);


  const handleCategoryClick = async (categoryId: number) => {
    setSelectedCategory(categoryId);

    if (categoryId) {
      const fetchProductItems = async () => {
        try {
          const response = await fetch('http://localhost:3000/product');
          const data = await response.json();
          setProductItems(data.filter((product: any) => product.categoryId === categoryId));
        } catch (error) {
          console.error('Error fetching menu items:', error);
        }
      };
      fetchProductItems();
    }
  };

  const handleProductClick = async (productId: number) => {
    const productSelected = productItems.filter((product: any) => product.id === productId)[0];
    setSelectedProduct(productSelected);
    setIngredients(productSelected.ingredients.map((ingredient: any) => ingredient.name));
    openModal();
  };

  return (
    <>
      <div className="flex items-center p-4">
        <Link href="/">
          <FaArrowLeft className="cursor-pointer w-8 h-10 mr-10 text-white hover:text-orange-600" />
        </Link>
        <div className="flex gap-6">
          {categoryItems.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
            >
              <div
                className={`cursor-pointer rounded-sm border-2 ${
                  selectedCategory === category.id
                    ? 'border-orange-600 bg-orange-600 font-semibold'
                    : 'border-gray-400 hover:bg-orange-700 hover:border-orange-700 hover:font-semibold'
                }`}
              >
                <p className="text-white text-sm px-6 py-2">{category.name.toUpperCase()}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {!selectedCategory ? (
        <>
          <Banner />
          <div className="flex flex-wrap gap-7">
            {categoryItems.map((category) => (
              <CategoryCard id={category.id} description={category.description} imageUrl={category.imageUrl} name={category.name} handleCategoryClick={handleCategoryClick} key={category.id} />
            ))}
          </div>
        </>
        ) : (
        <div className="flex flex-wrap gap-7">
          {productItems.map((product) => (
            <ProductCard id={product.id} description={product.description} imageUrl={product.imageUrl} name={product.name} handleProductClick={() => handleProductClick(product.id)} price={product.price} key={product.id} />
          ))}

          {selectedProduct && (<SelectProductIngredientsModal isOpen={modalIsOpen} onRequestClose={closeModal} imageUrl={selectedProduct.imageUrl} proceedEvent={proceedEvent} ingredients={ingredients}/>)}
        </div>
        )}
    </>
  );
};

export default Menu;
