import { useState,  } from "react"
import "./ContadorProductos.css"

const ContadorProductos = ({stock, inicial, funcionAgregar}) => {
    const[contador, setContador] = useState(inicial);

    const incrementarContador = () => {
        if(contador < stock) {
            setContador(contador + 1)
        }
    }

    const disminuirContador = () => {
        if(contador > inicial) {
            setContador(contador - 1)
        }
    }

  return (
    <div>
        <button className="counter-button" onClick={disminuirContador}>-</button>
        <p className="counter-value">{contador}</p>
        <button className="counter-button" onClick={incrementarContador}>+</button>
        <button className="agregar-button" onClick={() => funcionAgregar(contador)}> Agregar al carrito </button>
   </div>
  )
}

export default ContadorProductos