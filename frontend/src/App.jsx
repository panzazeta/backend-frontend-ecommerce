import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Registro } from './components/Registro/Registro'
import { Logueo } from './components/Logueo/Logueo'
import { Products } from './components/Productos/Productos'
import { NuevosProductos } from './components/NuevosProductos/NuevosProductos'


export const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/register' element={<Registro />} />
          <Route path='/login' element={<Logueo />} />
          <Route path='/products' element={<Products />} />
          <Route path='/new-product' element={<NuevosProductos />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}