import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    loading: false,
    offer: [],
    error: '',
}

export const fetchOffer = createAsyncThunk('offer/fetchOffer', (url) => {
    return axios.get(url).then((res) => res.data)
})

const offerSlice = createSlice({
    name: 'offer',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchOffer.pending, (state) => {
            state.loading = true
        })

        builder.addCase(fetchOffer.fulfilled, (state, action) => {
            state.loading = false
            state.offer = action.payload
            state.error = ''
        })

        builder.addCase(fetchOffer.rejected, (state) => {
            state.loading = false
            state.offer = []
            state.error = 'Something wrong while fetching offer'
        })
    },
})

export default offerSlice.reducer
