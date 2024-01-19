import { useRef } from "react"
import { useNavigate } from "react-router-dom"
import { useUser } from "../../utils/userContext"

export const Logueo = () => {
    const formRef = useRef(null);
    const navigate = useNavigate();
    const { updateCartId } = useUser();

    const handleSumbit = async (e) => {
        e.preventDefault();
        const datForm = new FormData(formRef.current);
        const data = Object.fromEntries(datForm);

        try {
            const response = await fetch('http://localhost:3000/api/session/login', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (response.status === 200) {
                const datos = await response.json();
                console.log(datos);
                // updateCartId(datos.user.cart);
                document.cookie = `jwtCookie=${datos.token}; expires${new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toUTCString()};path=/;`;
                navigate('/products');
            } else {
                console.log(response);
            }
        } catch (error) {
            console.error('Error al procesar la respuesta del servidor:', error);
        }
    }

    return (
        <div className="container">
            <h2>Formulario de Login</h2>
            <form onSubmit={handleSumbit} ref={formRef}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email: </label>
                    <input type="email" name="email" className="form-control" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password: </label>
                    <input type="password" name="password" className="form-control" />
                </div>
                <button type="submit" className="btn btn-primary">Iniciar Sesion</button>
            </form>
        </div>
    );
}