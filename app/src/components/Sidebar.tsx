import React from 'react';
import { MdThumbsUpDown, MdMenuBook } from 'react-icons/md';
import { GiBugleCall } from 'react-icons/gi';
import { AiFillDollarCircle } from 'react-icons/ai';
import { FaClipboardList } from 'react-icons/fa';
import { BsBookmarkStarFill } from 'react-icons/bs';
import Link from 'next/link';
import { useRouter } from 'next/router';

const sidebarItems = [
  { title: 'OFERTAS', icon: BsBookmarkStarFill, link: '/offers' },
  { title: 'CARDÁPIO', icon: MdMenuBook, link: '/menu' },
  { title: 'PEDIDOS', icon: FaClipboardList, link: '/orders' },
  { title: 'PAGAMENTO', icon: AiFillDollarCircle, link: '/payment' },
  { title: 'CHAMAR GARÇOM', icon: GiBugleCall, link: '/waiter' },
  { title: 'AVALIAR', icon: MdThumbsUpDown, link: '/rate' },
];

export const Sidebar: React.FC = () => {
  const router = useRouter();

  return (
    <div className="fixed top-1/2 -translate-y-1/2 translate-x-1/2">
      {sidebarItems.map(item => (
        <Link href={item.link} key={item.link}>
          <div
            className={`flex items-center text-center justify-center rounded-full w-24 h-24 border-gray-500 border-2 mb-6 cursor-pointer hover:font-semibold ${
              router.pathname === item.link 
                ? 'bg-orange-600 border-orange-600 font-semibold'
                : 'hover:bg-orange-700 hover:border-orange-700'
            }`}
          >
            <div className="flex text-white flex-col items-center">
              <item.icon className="text-2xl" />
              <p className="text-xs p-1">{item.title}</p>
            </div>
          </div>
        </Link>
      ))}
  </div>
  );
};
