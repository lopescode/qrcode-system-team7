import React, { useState, useEffect } from 'react';
import Link from 'next/link'
import { FaArrowLeft } from 'react-icons/fa';
import { Banner } from '@/components/Banner';
import SelectProductIngredientsModal from '@/components/SelectProductIngredientsModal';
import { CategoryCard } from '@/components/CategoryCard';
import { ProductCard } from '@/components/ProductCard';
import { Category, Product } from '@/models';

const Menu: React.FC = () => {
  const [categoryItems, setCategoryItems] = useState<Category[]>([]);
  const [productItems, setProductItems] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product>();
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number>();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleClick = async () => {
    try {
      const addItemToOrder = async () => {
        const response = await fetch(`http://localhost:3000/order-item`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            productId: selectedProduct?.id,
            orderId: 1,
            orderStatusId: 1
          }),
        });
        const data = await response.json();
        return data;
      };
      await addItemToOrder();
    } catch (error) {
      console.error('Error adding item to order:', error);
    }
    
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
        console.error('Error fetching category items:', error);
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
    <div className='h-full w-full'>
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
          <div className="flex flex-wrap gap-7 p-4">
            {categoryItems.map((category) => (
              <CategoryCard id={category.id} description={category.description} imageUrl={category.imageUrl} name={category.name} handleCategoryClick={handleCategoryClick} key={category.id} />
            ))}
          </div>
        </>
        ) : (
        <div className="flex flex-wrap gap-7 p-4">
          {productItems.map((product) => (
            <ProductCard id={product.id} description={product.description} imageUrl={product.imageUrl} name={product.name} handleProductClick={() => handleProductClick(product.id)} price={product.price} key={product.id} />
          ))}

          {selectedProduct && (<SelectProductIngredientsModal isOpen={modalIsOpen} onRequestClose={closeModal} selectedProduct={selectedProduct} handleClick={handleClick} ingredients={ingredients}/>)}
        </div>
        )}
    </div>
  );
};

export default Menu;
