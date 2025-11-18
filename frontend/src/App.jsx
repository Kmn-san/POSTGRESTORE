import NavBar from "./components/NavBar"
import HomePage from "./pages/HomePage"
import ProductPage from "./pages/ProductPage"
import {Routes,Route,Navigate} from "react-router-dom"
import { useThemeStore } from "./store/useThemestore"
import {Toaster} from "react-hot-toast"
import { useAuthStore } from "./store/useAuthStore"
import Login from "./pages/Login"
import MainPage from "./pages/MainPage"
import Register from "./pages/Register"
function App() {
  const {theme} = useThemeStore();
  const {isLoggedIn} = useAuthStore();
  return (
    <>
    <div className="min-h-screen bg-base-200 translate-colors duration-300" data-theme={theme}>
        {isLoggedIn && <NavBar />}
        <Routes>
          <Route path="/" element={isLoggedIn? <HomePage/> : <Navigate to ="/main"/>} />
          <Route path="/product/:id" element={isLoggedIn? <ProductPage/> : <Navigate to ="/main"/>} />
          <Route path="/main" element={isLoggedIn? <Navigate to = "/"/> :<MainPage />} />
          <Route path="/login" element={isLoggedIn? <Navigate to = "/"/> :<Login />} />
          <Route path="/register" element={isLoggedIn? <Navigate to = "/"/> :<Register />} />
          

        </Routes>

        <Toaster />
    </div>
    </>
  )
}

export default App
