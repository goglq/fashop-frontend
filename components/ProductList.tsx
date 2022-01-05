import { ProductDto } from '../dtos/ProductDto'
import ProductCard from './ProductCard'

interface Props {
  products: ProductDto[]
}

const ProductList = ({ products }: Props) => {
  return (
    <div className="flex space-x-5 pb-4 overflow-x-auto scroller">
      {products
        ? products.map((product: ProductDto) => (
            <ProductCard key={product.id} product={product} />
          ))
        : 'empty'}
    </div>
  )
}

export default ProductList
