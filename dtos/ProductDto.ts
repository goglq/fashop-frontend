import { BrandDto } from './BrandDto'
import { CategoryDto } from './CategoryDto'
import ProductImageDto from './ProductImageDto'

export interface ProductDto {
  id: number
  name: string
  price: string
  description: string
  productImages: ProductImageDto[]
}

export interface ProductWithCategoriesDto extends ProductDto {
  categories: CategoryDto[]
}

export interface ProductWithBrandDto extends ProductDto {
  brand: BrandDto
}
