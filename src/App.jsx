import { BrowserRouter, Routes, Route } from "react-router-dom";
import { routes } from "./utils/routes";
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
import Profile from "./Routes/Profile";
import ContextProvider from "./Context/GlobalContext";
import './styles/styles.scss'

function App() {
  return (
    <div>
      <BrowserRouter>
      <ContextProvider>
           <Routes>
            <Route element={<Layout />}>
              <Route path={routes.home} element={<Home />} />
              <Route path={routes.about} element={<About />} />
              <Route path={routes.legal} element={<Legal />} />
              <Route path={routes.detail} element={<Detail />} />
              <Route path={routes.gallery} element={<ImageGallery />} />
              <Route path={routes.search} element={<Search />} />
              <Route path={routes.admin} element={<Administracion />} />
              <Route path={routes.listVehicles}element={<ListVehicles />} />
              <Route path={routes.categories} element={<Categories />} />
              <Route path={routes.listUsers} element={<ListUsers />} />
              <Route path={routes.login} element={<Login />} />
              <Route path={routes.register} element={<Register />} />
              <Route path={routes.favs} element={<Favs />} />
              <Route path={routes.profile} element={<Profile/>} />
            </Route>
          </Routes>
          </ContextProvider>
      </BrowserRouter>
    </div>
  )
}
export default App
