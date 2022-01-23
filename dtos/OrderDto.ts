import OrderStatusDto from './OrderStatus'

export default interface OrderDto {
  id: number
  city: string
  street: string
  building: string
  section: string
  housing: string
  postIndex: string
  totalPrice: number
  status: OrderStatusDto
}
