import OrderStatusDto from './OrderStatus'

export default interface OrderDto {
  id: number
  address: string
  totalPrice: number
  status: OrderStatusDto
}
