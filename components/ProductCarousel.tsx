type Props = {
  className?: string
}

const ProductCarousel = ({ className }: Props) => {
  return (
    <div className={`flex space-x-5 h-164 ${className}`}>
      <div className="h-full space-y-7 overflow-y-auto overflow-x-hidden scroller pr-4">
        <div className="h-28 w-28 rounded-lg bg-green-100"></div>
        <div className="h-28 w-28 rounded-lg bg-green-100"></div>
        <div className="h-28 w-28 rounded-lg bg-green-100"></div>
        <div className="h-28 w-28 rounded-lg bg-green-100"></div>
        <div className="h-28 w-28 rounded-lg bg-green-100"></div>
        <div className="h-28 w-28 rounded-lg bg-green-100"></div>

        <div className="h-28 w-28 rounded-lg bg-green-100"></div>
      </div>
      <img
        src="https://via.placeholder.com/500x600"
        alt=""
        className="rounded-lg"
      />
    </div>
  )
}

export default ProductCarousel
