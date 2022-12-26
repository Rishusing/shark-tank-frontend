
import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slice/authSlice'
import userReducer from './slice/userSlice'
import alluserSlice from './slice/alluserSlice'
import pitchesSlice from './slice/pitchesSlice'
import offerSlice from './slice/offerSlice'

const store = configureStore({
    reducer: {
        profile: authReducer,
        user: userReducer,
        alluser: alluserSlice,
        pitches : pitchesSlice,
        offer : offerSlice,
    }
})

export default store