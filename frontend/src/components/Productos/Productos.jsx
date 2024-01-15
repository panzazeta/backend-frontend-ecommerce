import './Productos.css';
import { useEffect, useState } from 'react';
import { getCookiesPorNombre } from '../../utils/formHelper'
import  Product  from '../ProductoDetalle/ProductoDetalle';
import Logout from '../Logout/Logout'

export const Products = () => {
    const [productos, setProductos] = useState([]);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const obtenerProductos = async () => {
        try {
          const token = getCookiesPorNombre('jwtCookie');
          const response = await fetch('http://localhost:3000/api/products', {
            method: 'GET',
            credentials: 'include',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            },
          });
  
          if (response.status === 200) {
            const data = await response.json();
            setProductos(data.docs);
          } else if (response.status === 401) {
            const datos = await response.json();
            console.error('Error al acceder a productos. Debes iniciar sesión.', datos);
            setError('Error al acceder a productos. Debes iniciar sesión.');
          } else {
            const data = await response.json();
            console.error('Error desconocido:', data);
            setError('Error desconocido al acceder a productos.');
          }
        } catch (error) {
          console.error('Error al intentar acceder a la URL', error);
          setError('Error al intentar acceder a la URL.');
        }
      };
  
      obtenerProductos();
    }, []);
  
    return (
      <div>
        {error && <p>{error}</p>}
        <h2>Productos</h2>
        <div className="productos-container">
          {productos.map(producto => (
            <Product key={producto._id} producto={producto} />
          ))}
        </div>
      </div>
    );
  };
  