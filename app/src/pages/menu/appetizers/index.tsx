import { ItemCard } from "@/components/ItemCard"
import { appetizerItems } from "@/constants/items"

const Appetizers: React.FC = () => {
  return (
    <div className="flex flex-wrap gap-7">
      {appetizerItems.map(item => (
        <ItemCard title={item.title} description={item.description} price={item.price} image={item.image} />
      ))}
  </div>
  )
}

export default Appetizers