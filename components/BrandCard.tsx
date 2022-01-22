import Link from 'next/link'
import { BrandDto } from '../dtos/BrandDto'

type Props = {
  brand: BrandDto
  className?: string
}

const BrandCard = ({ brand, className }: Props) => {
  return (
    <Link href={`/brand/${brand.id}`}>
      <a
        className={`flex justify-center items-center h-24 w-48 rounded-md bg-green-400 overflow-hidden cursor-pointer ${className}`}
      >
        <img src={brand.brandImage.thumbnail} alt="brand" />
      </a>
    </Link>
  )
}

export default BrandCard
