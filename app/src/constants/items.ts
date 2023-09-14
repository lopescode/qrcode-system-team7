
import HamburgueresImage from '../assets/images/hamburgueres.png'
import AperitivosImage from '../assets/images/aperitivos.png'
import PizzasImage from '../assets/images/pizzas.png'
import MassasImage from '../assets/images/massas.png'
import SobremesasImage from '../assets/images/sobremesas.png'
import FrutosDoMarImage from '../assets/images/frutos-do-mar.png'
import BebidasImage from '../assets/images/bebidas.png'
import DrinksImage from '../assets/images/drinks.png'
import BatataFritaImage from '../assets/images/batata-frita.jpg'
import CebolaFritaImage from '../assets/images/cebola-frita.png'

export const menuItems = [
  {
    title: 'Aperitivos',
    description: 'Deliciosos petiscos para abrir o apetite, perfeitos para compartilhar com amigos.',
    image: AperitivosImage,
    link: '/menu/appetizers'
  },
  {
    title: 'Pizzas',
    description: 'Pizzas artesanais com coberturas frescas e queijo derretido.',
    image: PizzasImage,
    link: '/menu/pizzas'
  },
  {
    title: 'Hamburgueres',
    description: 'Hambúrgueres suculentos, montados com ingredientes premium.',
    image: HamburgueresImage,
    link: '/menu/burgers'
  },
  {
    title: 'Massas',
    description: 'Massas al dente com molhos que fazem a boca salivar.',
    image: MassasImage,
    link: '/menu/pastas'
  },
  {
    title: 'Sobremesas',
    description: 'Doces irresistíveis que encerram a refeição com chave de ouro.',
    image: SobremesasImage,
    link: '/menu/desserts'
  },
  {
    title: 'Frutos do Mar',
    description: 'Frutos do mar frescos preparados com maestria.',
    image: FrutosDoMarImage,
    link: '/menu/seafood'
  },
  {
    title: 'Bebidas',
    description: 'Refrigerantes, sucos naturais e chás para acompanhar sua refeição.',
    image: BebidasImage,
    link: '/menu/drinks'
  },
  {
    title: 'Drinks',
    description: 'Coquetéis artesanais preparados por mixologistas experientes.',
    image: DrinksImage,
    link: '/menu/housedrinks'
  },
]

export const navbarItems = [
  { title: 'TODOS', link: '/menu' },
  ...menuItems
]

export const appetizerItems = [
  {
    title: 'Batata Frita',
    description: 'Batata frita crocante, temperada com sal e ervas finas.',
    price: '12.00',
    image: BatataFritaImage,
    link: ""
  },
  {
    title: 'Cebola Frita',
    description: 'Cebola frita crocante, temperada com sal e ervas finas.',
    price: '12.00',
    image: CebolaFritaImage,
    link: "#"
  }
]