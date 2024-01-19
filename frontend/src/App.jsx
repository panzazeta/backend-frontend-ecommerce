import { BrowserRouter, Route, Routes } from 'react-router-dom'
import NavBar from "./components/NavBar/NavBar";
import { Registro } from './components/Registro/Registro'
import { Logueo } from './components/Logueo/Logueo'
import { Products }  from './components/Productos/Productos'
import { NuevosProductos } from './components/NuevosProductos/NuevosProductos'
import { Cart } from "./components/Cart/Cart"
import { UserProvider } from './utils/userContext.jsx';


export const App = () => {
  return (
    <UserProvider>
    <>
      <BrowserRouter>
      <NavBar />
        <Routes>
          <Route path='/register' element={<Registro />} />
          <Route path='/login' element={<Logueo />} />
          <Route path='/products' element={<Products />} />
          <Route path='/new-product' element={<NuevosProductos />} />
          <Route path='/cart' element={<Cart />} />
        </Routes>
      </BrowserRouter>
    </>
    </UserProvider>
  )
}