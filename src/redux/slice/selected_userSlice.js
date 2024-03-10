import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    userExist: false,
    selectedUser: {}
}

const selectUserSlice = createSlice({
    name: 'selectedUser',
    initialState,
    reducers: {
        setSelectedUser: (state, action) => {
            state.userExist = true;
            state.selectedUser = action.payload;
        }
    }
})


export default selectUserSlice.reducer;
export const { setSelectedUser } = selectUserSlice.actions
