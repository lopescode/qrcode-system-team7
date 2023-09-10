import React from 'react'
import { FaArrowLeft } from 'react-icons/fa'

const navbarItems: string[] = ['TODOS', 'APERITIVOS', 'PIZZAS', 'HAMBURGUERES', 'SOBREMESAS', 'BEBIDAS']

export const Navbar: React.FC = () => {
  return (
    <div className="flex items-center p-4">
      <FaArrowLeft className="cursor-pointer w-8 h-10 mr-10 text-white hover:text-orange-600" />
      <div className="flex gap-6">
        {navbarItems.map(item => (
          <div className="cursor-pointer border-gray-400 hover:border-orange-600 hover:bg-orange-600 hover:font-semibold rounded-sm border-2">
            <p className="text-white text-md px-6 py-2">{item}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
