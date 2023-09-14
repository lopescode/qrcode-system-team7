import Image, { type StaticImageData } from 'next/image'
import Link from 'next/link'
import React from 'react'

export interface ICard {
  title: string
  description: string
  image: StaticImageData
  link: string
}

export const MenuCard: React.FC<ICard> = ({ description, image, title, link }: ICard) => {
  return (
    <Link
      href={link}
      className="cursor-pointer bg-black w-60 rounded-lg hover:scale-105 overflow-hidden transition duration-200 ease-out hover:ease-in hover:shadow-2xl hover:shadow-orange-500/20
      hover:font-semibold"
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
      </div>
    </Link>
  )
}
