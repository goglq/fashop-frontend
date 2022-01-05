import Link from 'next/link'
import { ProductDto } from '../dtos/ProductDto'

interface Props {
  product: ProductDto
  className?: string
}

const ProductCard = ({ product, className }: Props) => {
  return (
    <Link href={`/product/${product.id}`}>
      <div
        className={`flex-shrink-0 w-48 rounded-md shadow-md overflow-hidden cursor-pointer ${className}`}
      >
        <img className="object-cover" src={`${product.productImages[0].url}`} />
        <div className="mx-5 my-2 space-y-2">
          <p className="text-lg font-medium leading-5">{product.name}</p>
          <p className="text-xl text-right font-bold leading-5">
            ${product.price}
          </p>
        </div>
      </div>
    </Link>
  )
}

export default ProductCard
