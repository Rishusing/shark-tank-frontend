import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    loading: false,
    conversations: [],
    error: '',
}

export const fetchConversation = createAsyncThunk('conversations/fetchConversation', (url) => {
    return axios.get(url).then((res) => res.data)
})

const conversationsSlice = createSlice({
    name: 'conversations',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchConversation.pending, (state) => {
            state.loading = true
        })

        builder.addCase(fetchConversation.fulfilled, (state, action) => {
            state.loading = false
            state.conversations = [...action.payload]
            state.error = ''
        })

        builder.addCase(fetchConversation.rejected, (state) => {
            state.loading = false
            state.conversations = []
            state.error = 'Something wrong while fetching conversations'
        })
    },
})

export default conversationsSlice.reducer
