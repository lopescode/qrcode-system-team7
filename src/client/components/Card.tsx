import Image, { type StaticImageData } from 'next/image'
import React from 'react'

interface ICard {
  title: string
  description: string
  image: StaticImageData
  imageAlt: string
}

export const Card: React.FC<ICard> = ({ description, image, imageAlt, title }: ICard) => {
  return (
    <div className="flex-col bg-blue h-10 flex w-10">
      <Image src={image} alt={imageAlt} />
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  )
}
