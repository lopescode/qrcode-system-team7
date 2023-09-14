import React, { useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import Modal from './Modal'; 
import SelectIngredientsModalContent from './SelectIngredientsModalContent';

export interface ItemCardProps {
  title: string;
  description: string;
  price: string;
  image: StaticImageData;
}

export const ItemCard: React.FC<ItemCardProps> = ({ image, price, title, description }: ItemCardProps) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <>
      <div
        className="cursor-pointer bg-black w-60 rounded-lg hover:scale-105 overflow-hidden transition duration-200 ease-out hover:ease-in hover:shadow-2xl hover:shadow-orange-500/20 hover:font-semibold"
        onClick={openModal}
      >
        <div className="w-60 h-60 overflow-hidden">
          <Image
            className="w-full h-full object-cover transition duration-300 ease-out hover:ease-in hover:scale-125"
            src={image}
            alt={title}
          />
        </div>
        <div className="p-3">
          <h1 className="text-orange-400 text-xl">{title}</h1>
          <p className="text-white text-md">{description}</p>
          <p className="text-orange-400 font-semibold text-2xl mt-2 text-right pr-2">R$ {price}</p>
        </div>
      </div>
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
        <SelectIngredientsModalContent onClose={closeModal} />
      </Modal>
    </>
  );
};
