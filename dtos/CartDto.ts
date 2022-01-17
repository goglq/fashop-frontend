import { ProductDto } from './ProductDto'

export default interface CartDto {
  id: string
  count: number
  product: ProductDto
}
