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
    const { cid, pid } = req.params;
    const { quantity } = req.body;

    try {
        const cart = await cartModel.findById(cid);
        if (cart) {
            const prod = await productModel.findById(pid);

            if (prod) {
                const existingProduct = cart.products.find(item => item.id_prod._id.toString() === pid);

                if (existingProduct) {
                    // Sumar la cantidad existente con la nueva cantidad
                    existingProduct.quantity += quantity;
                } else {
                    cart.products.push({ id_prod: pid, quantity: quantity });
                }

                const respuesta = await cartModel.findByIdAndUpdate(cid, { $set: { products: cart.products } }, { new: true });
                res.status(200).send({ respuesta: 'OK', mensaje: respuesta });
            } else {
                res.status(404).send({ respuesta: 'Error en agregar producto Carrito', mensaje: 'Product Not Found' });
            }
        } else {
            res.status(404).send({ respuesta: 'Error en agregar producto Carrito', mensaje: 'Cart not Found' });
        }
    } catch (error) {
        console.log(error);
        res.status(400).send({ respuesta: 'Error en agregar producto Carrito', mensaje: error });
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
            return res.status(404).send({ respuesta: 'Error en Checkout', mensaje: 'Cart Not Found' });
        }

        const productosNoComprados = []; 
        let montoTotal = 0; 
        const Subtotales = {}; 

        for (const product of cart.products) {
            const { id_prod, quantity } = product;

            const cadaProducto = await productModel.findById(id_prod); //defino variable cadaProducto para ir sumando los valores parciales/total

            if (!cadaProducto) {
                return res.status(404).send({ respuesta: 'Error en finalizar compra', mensaje: 'Product Not Found' });
            }

            if (cadaProducto.stock >= quantity) {
                cadaProducto.stock -= quantity;
                await cadaProducto.save();
                const prodSubtotal = cadaProducto.price * quantity;

            if (!Subtotales[cadaProducto.category]) {
                Subtotales[cadaProducto.category] = 0;
                }

                Subtotales[cadaProducto.category] += prodSubtotal;
                montoTotal += prodSubtotal;

            } else {
                productosNoComprados.push(id_prod);
                cart.products = cart.products.filter(item => item.id_prod.toString() !== id_prod);
            }
        }

        // TICKET CHECKOUT
        const ticket = await ticketModel.create({ amount: montoTotal, cart });

        if (productosNoComprados.length > 0) {
            cart.products = cart.products.filter(item => productosNoComprados.includes(item.id_prod.toString()));
            await cartModel.findByIdAndUpdate(cid, { products: cart.products });
        } else {
            await cartModel.findByIdAndUpdate(cid, { products: [] }); //vacio cart luego del purchase
        }

        res.status(200).send({ respuesta: 'OK', mensaje: 'Compra realizada con éxito', ticket });
    } catch (error) {
        console.error(error);
        res.status(400).send({ respuesta: 'Error en finalizar compra', mensaje: error.message });
    }
};
