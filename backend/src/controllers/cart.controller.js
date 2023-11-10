import { cartModel } from "../models/carts.models.js";
import { productModel } from "../models/products.models.js";
import { ticketModel } from "../models/tickets.models.js"

export const getCart = async (req, res) => {
    const { id } = req.params
    try {
        const cart = await cartModel.findById(id)
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

// export const postCheckout = async (req, res) => {
//     const cartId = req.params.cid;

//   try {
//     const cart = await cartModel.findById(cartId).populate("items.product");
//     if (!cart) {
//       return res.status(404).json({ message: "Carrito no encontrado" });
//     }

//     const productsNotProcessed = []; 

//     for (const item of cart.items) {
//       const product = item.product;
//       const requestedQuantity = item.quantity;

//       if (product.stock >= requestedQuantity) {
//         // El producto tiene suficiente stock, restarlo
//         product.stock -= requestedQuantity;
//         await product.save();
//       } else {
//         // si el producto no tiene suficiente stock se almacenan en los no procesados
//         productsNotProcessed.push(product._id);
//       }
//     }

//     // se actualiza el carrito con los productos no procesados
//     cart.items = cart.items.filter(
//       (cartItem) => !productsNotProcessed.includes(cartItem.product._id)
//     );
//     await cart.save();

//     // se crea un ticket con los datos de la compra
//     const ticket = new ticketModel({
//       amount: cart.total, // Supongo que el carrito tiene un campo total
//       purchaser: cart.userEmail, // O donde se almacena el correo del usuario
//     });
//     await ticket.save();

//     return res.status(200).json({
//       message: "Compra finalizada exitosamente",
//       productsNotProcessed: productsNotProcessed,
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: "Error al procesar la compra" });
//   }
// };