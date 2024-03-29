import { useDispatch } from 'react-redux'
import { setUser } from './redux/slice/authSlice'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase'
import { useMemo } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Feed from './components/Feeds/Feed'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import RequireAuth from './RequireAuth'
import Profile from './components/Profile/Profile'
import CreateEntrepreneur from './components/CreateUsers/CreateEntrepreneur'
import CreateInvestor from './components/CreateUsers/CreateInvestor'
import { fetchUser } from './redux/slice/userSlice'
import { fetchAllUser } from './redux/slice/alluserSlice'
import { fetchConversation } from './redux/slice/conversationSlice'
import Notify from './partials/Notification/Notify'
import FetchPitch from './partials/SinglePost/FetchPitch'
import LandingPage from './LandingPage'
import MainBoard from './components/ChatMachine/MainBoard/MainBoard'

function App() {
  const dispatch = useDispatch()

  useMemo(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        dispatch(fetchUser(`${process.env.REACT_APP_BASE_API_URL}/user/${currentUser.uid}`))
        dispatch(fetchAllUser(`${process.env.REACT_APP_BASE_API_URL}/alluser/${currentUser.uid}`))
        dispatch(setUser({ email: currentUser.email, uid: currentUser.uid }))
        dispatch(fetchConversation(`${process.env.REACT_APP_BASE_API_URL}/chat_list/${currentUser.uid}`))
      }
    })
  }, [dispatch])

  // const userspinned = useSelector((state) => state.conversations)
  // console.log(userspinned);


  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/feed"
          element={
            <RequireAuth>
              <Feed />
            </RequireAuth>
          }
        />

        <Route
          path="/profile/:userId"
          element={
            <RequireAuth>
              <Profile />
            </RequireAuth>
          }
        />

        <Route
          path="/create-entrepreneur"
          element={
            <RequireAuth>
              <CreateEntrepreneur />
            </RequireAuth>
          }
        />

        <Route
          path="/create-investor"
          element={
            <RequireAuth>
              <CreateInvestor />
            </RequireAuth>
          }
        />

        <Route
          path="/message_engine/:id"
          element={
            <RequireAuth>
              <MainBoard />
            </RequireAuth>
          }
        />

        <Route
          path="/notifications/:id"
          element={
            <RequireAuth>
              <Notify />
            </RequireAuth>
          }
        />

        <Route
          path="/singlepitch/:id"
          element={
            <RequireAuth>
              <FetchPitch />
            </RequireAuth>
          }
        />
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
