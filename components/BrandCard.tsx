type Props = {
  img: string
  className?: string
}

const BrandCard = ({ img, className }: Props) => {
  return (
    <div
      className={`h-24 w-48 rounded-md bg-green-400 overflow-hidden cursor-pointer ${className}`}
    >
      <img src={img} alt="brand" />
    </div>
  )
}

export default BrandCard
