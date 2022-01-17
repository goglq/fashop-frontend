import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import CartDto from '../../dtos/CartDto'
import { CommonFlag } from '../CommonFlag'

export interface CartState {
  flag: CommonFlag
  carts?: CartDto[]
}

const initialState: CartState = {
  flag: CommonFlag.Idle,
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearFlag: (state) => {
      state.flag = CommonFlag.Idle
    },
    setCarts: (state, action: PayloadAction<CartDto[]>) => {
      state.carts = action.payload
    },
  },
})

export const { clearFlag, setCarts } = cartSlice.actions

export default cartSlice.reducer
