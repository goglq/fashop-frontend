import { gql } from '@apollo/client'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { UserDto } from '../../dtos/UserDto'
import { fetchQuery } from '../../lib/apollo'
import { CommonFlag } from '../CommonFlag'

export interface UserState {
  flag: CommonFlag
  isAuth: boolean
  user?: UserDto
  error?: string
}

const initialState: UserState = {
  isAuth: false,
  flag: CommonFlag.Idle,
}

export const checkAuthAsync = createAsyncThunk(
  'user/checkAuth',
  async (): Promise<string> => {
    const token = await fetchQuery(gql`
      query {
        accessToken
      }
    `)
    return token.data
  }
)

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearFlag: (state) => {
      state.flag = CommonFlag.Idle
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkAuthAsync.pending, (state) => {
        state.flag = CommonFlag.Loading
      })
      .addCase(checkAuthAsync.rejected, (state, action) => {
        state.flag = CommonFlag.Error
        state.isAuth = false
        state.error = action.error.message
      })
      .addCase(checkAuthAsync.fulfilled, (state, action) => {
        state.flag = CommonFlag.Success
        state.isAuth = true
        localStorage.setItem('token', action.payload)
      })
  },
})

export default userSlice.reducer
