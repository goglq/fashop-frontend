import { useState } from 'react'
import ProductImageDto from '../dtos/ProductImageDto'

type Props = {
  productImages?: ProductImageDto[]
  className?: string
}

const ProductImageCarousel = ({ className, productImages }: Props) => {
  const [currentImageId, setCurrentImageId] = useState<number>(
    productImages![0].id
  )

  return (
    <div className={`flex h-164 ${className}`}>
      <div className="h-full w-32 py-1 space-y-7 overflow-y-auto overflow-x-hidden scroller">
        {productImages &&
          productImages.map((productImage) => (
            <div
              key={productImage.id}
              className="overflow-hidden rounded-lg transform transition-all duration-200 hover:-translate-y-1 hover:shadow-lg ease-in-out"
            >
              <img
                key={productImage.id}
                src={productImage.url}
                className="h-28 w-28 rounded-lg bg-green-100 transform transition-all duration-500 hover:scale-110 ease-in-out"
                onClick={(e) => {
                  setCurrentImageId(productImage.id)
                }}
              />
            </div>
          ))}
      </div>
      <div className="px-5 w-full">
        <img
          src={`${
            productImages &&
            productImages.filter(
              (productImage) => productImage.id === currentImageId
            )[0].url
          }`}
          alt=""
          className="h-full w-full object-contain rounded-lg"
        />
      </div>
    </div>
  )
}

export default ProductImageCarousel
