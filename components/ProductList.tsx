import { ProductDto } from '../dtos/ProductDto'
import ProductCard from './ProductCard'

interface Props {
  products: ProductDto[]
}

const ProductList = ({ products }: Props) => {
  return (
    <div className="flex space-x-5 pb-4 pl-1 overflow-x-auto scroller fade-right fade-right">
      {products
        ? products.map((product: ProductDto) => (
            <ProductCard key={product.id} product={product} />
          ))
        : 'empty'}
    </div>
  )
}

export default ProductList
