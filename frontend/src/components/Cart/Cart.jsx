import { useEffect, useState } from 'react';
import { useUser } from '../../utils/userContext';

export const Cart = () => {
  const [cart, setCart] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    console.log("User:", user);

    const obtenerCarrito = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/carts/${user.cart}`, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.status === 200) {
          const data = await response.json();
          console.log("Cart Data:", data);
          setCart(data.mensaje.products);
        } else {
          console.error('Error al obtener el carrito del usuario');
        }
      } catch (error) {
        console.error('Error al intentar acceder a la URL del carrito', error);
      }
    };

    if (user && user.cart) {
      obtenerCarrito();
    }
  }, [user]);

  return (
    <div>
      <h2>Carrito de Compras</h2>
      <ul>
        {cart.map((item) => (
          <li key={item.id_prod._id}>
            {item.id_prod.title} - Cantidad: {item.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
};
