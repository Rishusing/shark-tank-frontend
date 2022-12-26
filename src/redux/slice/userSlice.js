import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    loading: false,
    users: null,
    error: '',
}

export const fetchUser = createAsyncThunk('user/fetchUser', (url) => {
    return axios.get(url).then((res) => res.data)
})

const userSlice = createSlice({
    name: 'user',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchUser.pending, (state) => {
            state.loading = true
        })

        builder.addCase(fetchUser.fulfilled, (state, action) => {
            state.loading = false
            state.users = action.payload
            state.error = ''
        })

        builder.addCase(fetchUser.rejected, (state) => {
            state.loading = false
            state.users = null
            state.error = 'Something wrong while fetchong user'
        })
    },
})

export default userSlice.reducer
