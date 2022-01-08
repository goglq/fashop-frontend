import { createSlice } from '@reduxjs/toolkit'
import { CommonFlag } from '../CommonFlag'

export interface CartState {
  flag: CommonFlag
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
  },
})

export const { clearFlag } = cartSlice.actions

export default cartSlice.reducer
