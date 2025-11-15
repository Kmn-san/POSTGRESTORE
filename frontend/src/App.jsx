import NavBar from "./components/NavBar"
import HomePage from "./pages/HomePage"
import ProductPage from "./pages/ProductPage"
import {Routes,Route} from "react-router-dom"
import { useThemeStore } from "./store/useThemestore"
import {Toaster} from "react-hot-toast"

function App() {
  const {theme} = useThemeStore();

  return (
    <>
    <div className="min-h-screen bg-base-200 translate-colors duration-300" data-theme={theme}>
        <NavBar />

        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/product/:id" element={<ProductPage/>} />

        </Routes>

        <Toaster />
    </div>
    </>
  )
}

export default App
