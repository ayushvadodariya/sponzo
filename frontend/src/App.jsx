import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Home, Landing, NotFound, Signin, Signup } from "./components/pages"

function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Landing/>} />
        <Route path='/signin' element={<Signin/>} />
        <Route path='/signup' element={<Signup />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App