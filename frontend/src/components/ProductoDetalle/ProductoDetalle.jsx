import React, { useState } from 'react';
import "./ProductoDetalle.css"
import ContadorProductos from "../ContadorProductos/ContadorProductos";

const Product = ({ producto }) => {
  const [cantidadSeleccionada, setCantidadSeleccionada] = useState(1);

  const handleAgregarAlCarrito = (cantidad) => {
      // Aquí puedes realizar alguna acción con la cantidad seleccionada, como agregar al carrito.
      console.log(`Agregando ${cantidad} ${producto.title} al carrito.`);
  };

  return (
      <div className="product-card">
          <h3>{producto.title}</h3>
          <p>Precio: ${producto.price}</p>
          <p>Stock: {producto.stock}</p>
          <ContadorProductos
              stock={producto.stock}
              inicial={1}
              funcionAgregar={handleAgregarAlCarrito}
          />
      </div>
  );
};

export default Product;