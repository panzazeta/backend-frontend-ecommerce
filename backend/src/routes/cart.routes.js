import { Router } from "express";
import { getCart, postCart, deleteCart, deleteCartProduct, postCartProduct, putCart, putCartProduct } from "../controllers/cart.controller.js";

const cartRouter = Router()

cartRouter.get('/:id', getCart);
cartRouter.post('/', postCart);
cartRouter.post('/:cid/products/:pid', postCartProduct)
cartRouter.delete('/:cid/products/:pid', deleteCartProduct);
cartRouter.put('/:cid', putCart);
cartRouter.put('/:cid/products/:pid', putCartProduct);
cartRouter.delete('/:cid', deleteCart);

export default cartRouter