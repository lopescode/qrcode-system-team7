import React from 'react'
import { MenuCard } from '../../components/MenuCard'
import { menuItems } from '@/constants/items'

const Menu: React.FC = () => {
  return (
    <div className="flex flex-wrap gap-7">
      {menuItems.map(item => (
        <MenuCard title={item.title} description={item.description} image={item.image} link={item.link} />
      ))}
    </div>
  )
}

export default Menu
