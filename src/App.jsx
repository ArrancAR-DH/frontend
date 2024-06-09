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
import ContextProvider from "./Context/GlobalContext";
import ProtectedRoute from "./Routes/ProtectedRoute";
import './styles/styles.scss';

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
              <Route 
                  path={routes.admin} 
                  element={
                        <ProtectedRoute>
                              <Administracion />
                        </ProtectedRoute>
                  } 
              />
              <Route path={routes.listVehicles}element={<ListVehicles />} />
              <Route 
                  path={routes.categories} 
                  element={
                        <ProtectedRoute>
                              <Categories />
                        </ProtectedRoute>
                  } 
              />
              <Route 
                  path={routes.listUsers} 
                  element={
                        <ProtectedRoute>
                              <ListUsers />
                        </ProtectedRoute>
                  } 
              />
              <Route path={routes.login} element={<Login />} />
              <Route path={routes.register} element={<Register />} />
              <Route path={routes.favs} element={<Favs />} />
            </Route>
          </Routes>
          </ContextProvider>
      </BrowserRouter>
    </div>
  )
}
export default App
