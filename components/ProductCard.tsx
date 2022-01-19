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
          <p className="truncate text-lg font-medium leading-5">
            {product.name}
          </p>
          <div className="flex justify-end space-x-2">
            <p
              className={
                product.sale > 0
                  ? 'text-md font-bold leading-5 line-through'
                  : 'text-xl font-bold leading-5'
              }
            >
              ${product.price}
            </p>
            <p
              className={
                product.sale > 0
                  ? 'text-xl font-bold leading-5 block'
                  : 'text-xl font-bold leading-5 hidden'
              }
            >
              $
              {(product.price - (product.price * product.sale) / 100).toFixed(
                2
              )}
            </p>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default ProductCard
