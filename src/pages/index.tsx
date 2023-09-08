import { Card } from '@/client/components/Card'
import React from 'react'
import HamburgueresImage from 'src/shared/images/hamburgueres.png'

const Home: React.FC = () => {
  return (
    <div className="flex-col container flex">
      <h1>Home</h1>
      <Card
        title="Hamburgueres"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        image={HamburgueresImage}
        imageAlt="Hamburgueres"
      />
    </div>
  )
}

export default Home
