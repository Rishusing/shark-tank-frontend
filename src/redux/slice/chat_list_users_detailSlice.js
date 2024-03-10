import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    loading: false,
    chatusersdetail: [],
    error: '',
}

export const fetchChatListUsersDetail = createAsyncThunk('chatusersdetail/fetchChatListUsersDetail', ({ url, userIds, own_id }) => {
    // return axios.get(url).then((res) => res.data)

    const userDetailsPromises = userIds.map(userId => {
        return axios.get(`${url}/${userId.userId2 !== own_id ? userId.userId2 : userId.userId1}`).then(response => response.data);
    });

    return Promise.all(userDetailsPromises);

})

const chatusersdetailSlice = createSlice({
    name: 'chatusersdetail',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(fetchChatListUsersDetail.pending, (state) => {
            state.loading = true
        })

        builder.addCase(fetchChatListUsersDetail.fulfilled, (state, action) => {
            state.loading = false
            state.chatusersdetail = [...action.payload]
            state.error = ''
        })

        builder.addCase(fetchChatListUsersDetail.rejected, (state) => {
            state.loading = false
            state.chatusersdetail = []
            state.error = 'Something wrong while fetching chatusersdetail'
        })
    },
})

export default chatusersdetailSlice.reducer
