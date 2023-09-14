import Link from 'next/link';
import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { useRouter } from 'next/router';
import { navbarItems } from '@/constants/items';

export const Navbar: React.FC = () => {
  const router = useRouter();

  return (
    <div className="flex items-center p-4">
      <Link href="/">
        <FaArrowLeft className="cursor-pointer w-8 h-10 mr-10 text-white hover:text-orange-600" />
      </Link>
      <div className="flex gap-6">
        {navbarItems.map(item => (
          <Link href={item.link} key={item.link}>
            <div
              className={`cursor-pointer rounded-sm border-2 ${
                router.pathname === item.link
                  ? 'border-orange-600 bg-orange-600 font-semibold'
                  : 'border-gray-400 hover:bg-orange-700 hover:border-orange-700 hover:font-semibold'
              }`}
            >
              <p className="text-white text-sm px-6 py-2">{item.title.toUpperCase()}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
