import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    loading: false,
    pitches: [],
    error: '',
}

export const fetchPitches = createAsyncThunk('pitches/fetchPitches', (url) => {
    return axios.get(url).then((res) => res.data)
})

const pitchesSlice = createSlice({
    name: 'pitches',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchPitches.pending, (state) => {
            state.loading = true
        })

        builder.addCase(fetchPitches.fulfilled, (state, action) => {
            state.loading = false
            state.pitches = [...state.pitches,...action.payload]
            state.error = ''
        })

        builder.addCase(fetchPitches.rejected, (state) => {
            state.loading = false
            state.pitches = []
            state.error = 'Something wrong while fetching pitches'
        })
    },
})

export default pitchesSlice.reducer
