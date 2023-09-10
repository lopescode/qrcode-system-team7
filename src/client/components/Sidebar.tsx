import React from 'react'
import { MdThumbsUpDown, MdMenuBook } from 'react-icons/md'
import { GiBugleCall } from 'react-icons/gi'
import { AiFillDollarCircle } from 'react-icons/ai'
import { FaClipboardList } from 'react-icons/fa'
import { BsBookmarkStarFill } from 'react-icons/bs'

const sidebarItems = [
  { title: 'OFERTAS', icon: BsBookmarkStarFill },
  { title: 'CARDÁPIO', icon: MdMenuBook },
  { title: 'PEDIDOS', icon: FaClipboardList },
  { title: 'PAGAMENTO', icon: AiFillDollarCircle },
  { title: 'CHAMAR GARÇOM', icon: GiBugleCall },
  { title: 'AVALIAR', icon: MdThumbsUpDown },
]

export const Sidebar: React.FC = () => {
  return (
    <div className="flex justify-center w-1/6 mt-20">
      <div className="flex-col">
        {sidebarItems.map(item => (
          <div className="flex items-center text-center justify-center rounded-full w-32 h-32 border-gray-500 border-2 mb-6 cursor-pointer hover:bg-orange-600 hover:border-orange-600 hover:font-semibold">
            <div className="flex text-white flex-col items-center">
              <item.icon className="text-4xl" />
              <p className="text-md p-1">{item.title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
