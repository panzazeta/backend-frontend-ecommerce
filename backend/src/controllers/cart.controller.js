import { cartModel } from "../models/carts.models.js";
import { productModel } from "../models/products.models.js";
import { ticketModel } from "../models/tickets.models.js"

export const getCart = async (req, res) => {
    const { cid } = req.params
    try {
        const cart = await cartModel.findById(cid)
        if (cart)
            res.status(200).send({ respuesta: 'OK', mensaje: cart })
        else
            res.status(404).send({ respuesta: 'Error en consultar Carrito', mensaje: 'Not Found' })
    } catch (error) {
        res.status(400).send({ respuesta: 'Error en consulta carrito', mensaje: error })
    }
};

export const postCart = async (req, res) => {
    try {
        const cart = await cartModel.create({})
        res.status(200).send({ respuesta: 'OK', mensaje: cart })
    } catch (error) {
        res.status(400).send({ respuesta: 'Error en crear Carrito', mensaje: error })
    }
};

export const postCartProduct = async (req, res) => {
    const { cid, pid } = req.params
    const { quantity } = req.body

    try {
        const cart = await cartModel.findById(cid)
        if (cart) {
            const prod = await productModel.findById(pid) //Busco si existe en LA BDD, no en el carrito

            if (prod) {
                const indice = cart.products.findIndex(item => item.id_prod._id.toString() === pid); //Busco si existe en el carrito
                if (indice != -1) {
                    cart.products[indice].quantity = quantity //Si existe en el carrito modifico la cantidad
                } else {
                    cart.products.push({ id_prod: pid, quantity: quantity }) //Si no existe, lo agrego al carrito
                }
                const respuesta = await cartModel.findByIdAndUpdate(cid, cart) //Actualizar el carrito
                res.status(200).send({ respuesta: 'OK', mensaje: respuesta })
            } else {
                res.status(404).send({ respuesta: 'Error en agregar producto Carrito', mensaje: 'Product Not Found' })
            }
        } else {
            res.status(404).send({ respuesta: 'Error en agregar producto Carrito', mensaje: 'Cart not Found' })
        }

    } catch (error) {
        console.log(error)
        res.status(400).send({ respuesta: 'Error en agregar producto Carrito', mensaje: error })
    }
};

export const deleteCartProduct = async (req, res) => {
    const { cid, pid } = req.params;
    try {
        const cart = await cartModel.findById(cid);
        if (cart) {
            const prod = await productModel.findById(pid);

            if (prod) {
                cart.products = cart.products.filter(item => item.id_prod._id.toString() !== pid); 
                await cartModel.findByIdAndUpdate(cid, { products: cart.products });
                res.status(200).send({ respuesta: 'OK', mensaje: 'Producto eliminado del carrito' });
            } else {
                res.status(404).send({ respuesta: 'Error al eliminar producto del Carrito', mensaje: 'Product Not Found' });
            }
        } else {
            res.status(404).send({ respuesta: 'Error al eliminar producto del Carrito', mensaje: 'Cart Not Found' });
        }

    } catch (error) {
        console.log(error);
        res.status(400).send({ respuesta: 'Error al eliminar producto del Carrito', mensaje: error });
    }
};

export const putCart = async (req, res) => {
    const { cid } = req.params;
    const newProducts = req.body;

    try {
        const cart = await cartModel.findById(cid);

        if (!cart) {
            return res.status(404).send({ respuesta: 'Error en actualizar carrito', mensaje: 'Cart Not Found' });
        }

        if (!Array.isArray(newProducts)) {
            return res.status(400).send({ respuesta: 'Error en actualizar carrito', mensaje: 'Please send a valid array' });
        }

        newProducts.forEach((newProduct) => {
            const { id_prod, quantity } = newProduct;
            const isProductIndex = cart.products.findIndex(item => item.id_prod === id_prod);

            if (isProductIndex !== -1) {
               cart.products[isProductIndex].quantity = quantity;
            } else {
               cart.products.push({ id_prod, quantity });
            }
        });

        const updatedCart = await cartModel.findByIdAndUpdate(cid, cart);
        res.status(200).send({ respuesta: 'OK', mensaje: updatedCart });

    } catch (error) {
        console.error(error);
        res.status(400).send({ respuesta: 'Error en actualizar carrito', mensaje: error.message });
    }
};

export const putCartProduct = async (req, res) => {
    const { cid, pid } = req.params;
    const { quantity } = req.body;

    try {
        const cart = await cartModel.findById(cid);
        if (cart) {
            const indice = cart.products.findIndex(item => item.id_prod._id.toString() === pid);
            if (indice !== -1) {
                cart.products[indice].quantity = quantity;
                const respuesta = await cartModel.findByIdAndUpdate(cid, cart);
                res.status(200).send({ respuesta: 'OK', mensaje: respuesta });
            } else {
                res.status(404).send({ respuesta: 'Error al actualizar producto en el Carrito', mensaje: 'Product Not Found in Cart' });
            }
        } else {
            res.status(404).send({ respuesta: 'Error al actualizar producto en el Carrito', mensaje: 'Cart Not Found' });
        }
    } catch (error) {
        console.log(error);
        res.status(400).send({ respuesta: 'Error al actualizar producto en el Carrito', mensaje: error });
    }
};

export const deleteCart = async (req, res) => {
    const { cid } = req.params;

    try {
        const cart = await cartModel.findByIdAndUpdate(cid, { products: [] });

        if (cart) {
            res.status(200).send({ respuesta: 'OK', mensaje: 'Carrito vaciado', cart });
        } else {
            res.status(404).send({ respuesta: 'Error en eliminar productos del carrito', mensaje: 'Cart Not Found' });
        }
    } catch (error) {
        console.log(error);
        res.status(400).send({ respuesta: 'Error en eliminar productos del carrito', mensaje: error });
    }
};

export const postCheckout = async (req, res) => {
    const { cid } = req.params;

    try {
        const cart = await cartModel.findById(cid);

        if (!cart) {
            return res.status(404).send({ respuesta: 'Error en finalizar compra', mensaje: 'Cart Not Found' });
        }

        const productsNotPurchased = []; // Almacenar los productos que no pudieron comprarse
        let totalAmount = 0; // Inicializar el total a 0

        const categorySubtotals = {}; // Almacenar sumas parciales por categoría

        // Iterar sobre los productos en el carrito
        for (const product of cart.products) {
            const { id_prod, quantity } = product;

            // Obtener el producto de la base de datos
            const dbProduct = await productModel.findById(id_prod);

            if (!dbProduct) {
                return res.status(404).send({ respuesta: 'Error en finalizar compra', mensaje: 'Product Not Found' });
            }

            // Verificar si hay suficiente stock
            if (dbProduct.stock >= quantity) {
                // Restar la cantidad del carrito al stock del producto
                dbProduct.stock -= quantity;
                
                // Actualizar el producto en la base de datos
                await dbProduct.save();

                // Calcular el subtotal para este producto
                const subtotal = dbProduct.price * quantity;

                // Acumular el subtotal en la categoría correspondiente
                if (!categorySubtotals[dbProduct.category]) {
                    categorySubtotals[dbProduct.category] = 0;
                }

                categorySubtotals[dbProduct.category] += subtotal;

                // Acumular el subtotal en el total general
                totalAmount += subtotal;
            } else {
                // Si no hay suficiente stock, agregar el producto a la lista de no comprados
                productsNotPurchased.push(id_prod);

                // Opcional: Eliminar el producto del carrito
                cart.products = cart.products.filter(item => item.id_prod.toString() !== id_prod);
            }
        }

        // Crear un ticket con la información de la compra y el total calculado
        const ticket = await ticketModel.create({ amount: totalAmount, cart });

        // Si hay productos que no pudieron comprarse, actualizar el carrito del usuario
        if (productsNotPurchased.length > 0) {
            // Filtrar los productos que no se pudieron comprar
            cart.products = cart.products.filter(item => productsNotPurchased.includes(item.id_prod.toString()));

            // Actualizar el carrito en la base de datos
            await cartModel.findByIdAndUpdate(cid, { products: cart.products });
        } else {
            // Si todos los productos se compraron, vaciar el carrito
            await cartModel.findByIdAndUpdate(cid, { products: [] });
        }

        res.status(200).send({ respuesta: 'OK', mensaje: 'Compra realizada con éxito', ticket });
    } catch (error) {
        console.error(error);
        res.status(400).send({ respuesta: 'Error en finalizar compra', mensaje: error.message });
    }
};
