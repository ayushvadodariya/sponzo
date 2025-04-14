import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Home, Landing, NotFound, Signin, Signup } from "./components/pages"
import { GoogleOAuthProvider } from '@react-oauth/google'
import { ProtectedRoute } from './components/common/ProtectedRoute';

function App() {
  return(
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path='/' element={<Landing/>} />
          <Route path='/signin' element={<Signin />} />
          <Route path='/signup' element={<Signup />} />
          
          {/* Protected routes */}
          <Route element={<ProtectedRoute />}>
            <Route path='/home' element={<Home/>} />
          </Route>
          
          <Route path="*" element={<NotFound/>} />
        </Routes>
      </BrowserRouter>
    </GoogleOAuthProvider>
  )
}

export default App

