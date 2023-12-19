import { Router } from "express";
import { getUsers, getUser, putUser, deleteUser } from "../controllers/users.controller.js";
import crypto from "crypto";

const userRouter = Router()

userRouter.get('/', getUsers);
userRouter.get('/:id', getUser);
userRouter.put('/:id', putUser);
userRouter.delete('/:id', deleteUser);

export default userRouter