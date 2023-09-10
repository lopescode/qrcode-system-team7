import { Banner } from '@/client/components/Banner'
import { Card, ICard } from '@/client/components/Card'
import React from 'react'
import HamburgueresImage from 'src/shared/images/hamburgueres.png'
import AperitivosImage from 'src/shared/images/aperitivos.png'
import PizzasImage from 'src/shared/images/pizzas.png'
import { Navbar } from '@/client/components/Navbar'
import { Sidebar } from '@/client/components/Sidebar'
import MassasImage from 'src/shared/images/massas.png'
import SobremesasImage from 'src/shared/images/sobremesas.png'
import FrutosDoMarImage from 'src/shared/images/frutos-do-mar.png'
import BebidasImage from 'src/shared/images/bebidas.png'
import DrinksImage from 'src/shared/images/drinks.png'

const cardItems: ICard[] = [
  {
    title: 'Aperitivos',
    description: 'Deliciosos petiscos para abrir o apetite, perfeitos para compartilhar com amigos.',
    image: AperitivosImage,
  },
  {
    title: 'Pizzas',
    description: 'Pizzas artesanais com coberturas frescas e queijo derretido.',
    image: PizzasImage,
  },
  {
    title: 'Hamburgueres',
    description: 'Hambúrgueres suculentos, montados com ingredientes premium.',
    image: HamburgueresImage,
  },
  {
    title: 'Massas',
    description: 'Massas al dente com molhos que fazem a boca salivar.',
    image: MassasImage,
  },
  {
    title: 'Sobremesas',
    description: 'Doces irresistíveis que encerram a refeição com chave de ouro.',
    image: SobremesasImage,
  },
  {
    title: 'Frutos do Mar',
    description: 'Frutos do mar frescos preparados com maestria.',
    image: FrutosDoMarImage,
  },
  {
    title: 'Bebidas',
    description: 'Refrigerantes, sucos naturais e chás para acompanhar sua refeição.',
    image: BebidasImage,
  },
  {
    title: 'Drinks',
    description: 'Coquetéis artesanais preparados por mixologistas experientes.',
    image: DrinksImage,
  },
]

const Home: React.FC = () => {
  return (
    <div className="flex w-full h-full bg-black">
      <Sidebar />
      <div className="w-full h-full">
        <Navbar />
        <Banner />
        <div className="bg-zinc-900 p-6">
          <div className="flex flex-wrap gap-7">
            {cardItems.map(item => (
              <Card title={item.title} description={item.description} image={item.image} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
