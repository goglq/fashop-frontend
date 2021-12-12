import { CategoryDto } from './CategoryDto'

export interface ProductDto {
  id: number
  name: string
}

export interface ProductWithCategoriesDto extends ProductDto {
  categories: CategoryDto[]
}
