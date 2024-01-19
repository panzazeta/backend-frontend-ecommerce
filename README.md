# BACKEND DE ECOMMERCE - CODERHOUSE

## Rutas y definición de métodos

### 1. USERS

- **GET Users:** `api/users`
  Muestra id, nombre, email y rol.

- **GET User:** `api/users/:id`
  Ejemplo: `http://localhost:3000/api/users/6543d6f529ca96844b782e85`

- **DELETE Inactive Users:** `api/users`
  Elimina a los usuarios que no tengan rol "admin" y no hayan iniciado sesión en los últimos 30 minutos.
  (Se envía a los usuarios un email de aviso sobre eliminación de su cuenta)

### 2. SESSIONS

- **POST Register Users:** `api/session/register`

- **POST Login Users:** `api/session/login`

- **GET Current session:** `api/session/current`

- **GET Logout Users:** `api/session/logout` (*testear final)

### 3. PRODUCTS

- **GET Products:** `api/products`

- **GET Product by ID:** `api/products/id`
Ejemplo: `http://localhost:3000/api/products/65a5ba9091d04f902127a621`

- **POST Create Products:** `api/products` (solo con credenciales de admin)

- **PUT Update Products:** `api/products/pid` (solo con credenciales de admin)
Ejemplo: `http://localhost:3000/api/products/65aa498bd9fd1205dffc1b77`

- **DELETE Products:** `api/products/pid` (solo con credenciales de admin)

### 4. CARTS

- **GET Cart by ID:** `api/carts/:cid`
Ejemplo: `http://localhost:3000/api/carts/650370ad73ead12c37ed180b`

- **POST Add Product Cart:** `api/carts/:cid/product/:id`
Ejemplo: `http://localhost:3000/api/carts/650370ad73ead12c37ed180b/product/:id`

- **PUT Update Cart Products:** `http://localhost:3000/api/carts/:cid`
Ejemplo: `http://localhost:3000/api/carts/650370ad73ead12c37ed180b`

- **PUT Update Product Quantity:** `api/carts/:cid/product/:pid`
Ejemplo: `http://localhost:3000/api/carts/650370ad73ead12c37ed180b/product/6544f7e2043834153a3a1c05`

- **DELETE Cart Products:** `api/carts/:cid`

- **DELETE Cart Product:** `api/carts/:cid/product/:pid`

- **POST Create Ticket:** `/:cid/purchase`
Ejemplo: `http://localhost:3000/api/carts/652a97a909b6754f0e2300ac/purchase`

## DEPLOY en Render.com:
[Link al deploy](https://dashboard.render.com/web/srv-cmkpjev109ks73egh71g/deploys/dep-cmkppkgl5elc738pddjg?r=2024-01-18%4021%3A48%3A06%7E2024-01-18%4021%3A51%3A28)

Se puede testear una vez iniciado con la ruta [https://backend-render-deploy.onrender.com/api/users](https://backend-render-deploy.onrender.com/api/users)
  










  

