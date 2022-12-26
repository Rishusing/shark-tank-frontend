import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    loading: false,
    alluser: [],
    error: '',
}

export const fetchAllUser = createAsyncThunk('alluser/fetchAllUser', (url) => {
    return axios.get(url).then((res) => res.data)
})

const alluserSlice = createSlice({
    name: 'alluser',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchAllUser.pending, (state) => {
            state.loading = true
        })

        builder.addCase(fetchAllUser.fulfilled, (state, action) => {
            state.loading = false
            state.alluser = action.payload
            state.error = ''
        })

        builder.addCase(fetchAllUser.rejected, (state) => {
            state.loading = false
            state.alluser = null
            state.error = 'Something wrong while fetchong user'
        })
    },
})

export default alluserSlice.reducer
