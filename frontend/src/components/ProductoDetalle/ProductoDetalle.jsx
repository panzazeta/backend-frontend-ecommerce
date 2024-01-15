import "./ProductoDetalle.css"

const Product = ({ producto }) => {
    return (
      <div className="product-card">
        <h3>{producto.title}</h3>
        <p>Precio: ${producto.price}</p>
        <p>Stock: {producto.stock}</p>
        {/* Puedes agregar más detalles según las propiedades de tu producto */}
      </div>
    );
  };
  
  export default Product;