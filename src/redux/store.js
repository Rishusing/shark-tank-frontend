
import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slice/authSlice'
import userReducer from './slice/userSlice'
import alluserSlice from './slice/alluserSlice'
import pitchesSlice from './slice/pitchesSlice'
import offerSlice from './slice/offerSlice'
import conversationSlice from './slice/conversationSlice'
import chat_list_users_detailSlice from './slice/chat_list_users_detailSlice'
import selectedUserReducer from './slice/selected_userSlice'

const store = configureStore({
    reducer: {
        profile: authReducer,
        user: userReducer,
        alluser: alluserSlice,
        pitches: pitchesSlice,
        offer: offerSlice,
        conversations: conversationSlice,
        chat_list_users: chat_list_users_detailSlice,
        selectedUser: selectedUserReducer
    }
})

export default store