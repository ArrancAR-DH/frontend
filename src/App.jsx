import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Components/layout/Layout";
import Home from "./Routes/Home";
import About from "./Routes/About";
import Legal from "./Routes/Legal";
import Detail from "./Routes/Detail";
import ImageGallery from "./Routes/ImageLibrary"
import Search from "./Routes/Search"
import Administracion from "./Routes/Administracion"
import ListVehicles from "./Routes/ListVehicles"
import Categories from "./Routes/Categories";
import ListUsers from "./Routes/ListUsers";
import Login from "./Routes/Login";
import Register from "./Routes/Register";
import Favs from "./Routes/Favs";
import Context from "./Context/StorageContext";
import ContextProvider from "./Components/utils/global.context";
import './styles/styles.scss'

function App() {
  return (
    <div>
      <BrowserRouter>
      <ContextProvider>
        <Context>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/legal" element={<Legal />} />
              <Route path="/cars/:id" element={<Detail />} />
              <Route path="/cars/:id/images" element={<ImageGallery />} />
              <Route path="/search/:search?" element={<Search />} />
              <Route path="/administracion" element={<Administracion />} />
              <Route path="/administracion/listvehicles" element={<ListVehicles />} />
              <Route path="/administracion/categories" element={<Categories />} />
              <Route path="/administracion/listusers" element={<ListUsers />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/favs" element={<Favs />} />
            </Route>
          </Routes>
        </Context>
        </ContextProvider>
      </BrowserRouter>
    </div>
  )
}
export default App
