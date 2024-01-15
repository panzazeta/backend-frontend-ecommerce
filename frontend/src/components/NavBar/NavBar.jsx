import "./NavBar.css"
// import CartWidget from "../CartWidget/CartWidget"
import { Link, NavLink } from "react-router-dom"

const NavBar = () => {
  return (
    <header>
        <Link to={"/products"}>
          <h1>Comercio</h1>
        </Link>
     

        <h2>Carrito de compras</h2>

    </header>
  )
}

export default NavBar