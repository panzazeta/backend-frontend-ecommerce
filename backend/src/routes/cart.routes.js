import { Router } from "express";
import { getCart, postCart, deleteCart, deleteCartProduct, postCartProduct, putCart, putCartProduct } from "../controllers/cart.controller.js";
import { passportError, authorization } from "../utils/messagesError.js";

const cartRouter = Router()

cartRouter.get('/:id', getCart);
cartRouter.post('/', postCart);
cartRouter.post('/:cid/products/:pid', passportError('jwt'), authorization('user'), postCartProduct) //solo user puede agregar productos al cart
cartRouter.delete('/:cid/products/:pid', deleteCartProduct);
cartRouter.put('/:cid', putCart);
cartRouter.put('/:cid/products/:pid', putCartProduct);
cartRouter.delete('/:cid', deleteCart);
// cartRouter.get('/:cid/purchase', postCheckout);

export default cartRouter