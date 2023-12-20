import { Router } from "express";
import { getUsers, getUser, putUser, deleteUser, recoveryMail, resetPassword } from "../controllers/users.controller.js";


const userRouter = Router()

userRouter.get('/', getUsers);
userRouter.get('/:id', getUser);
userRouter.put('/:id', putUser);
userRouter.delete('/:id', deleteUser);
userRouter.post('/password-recovery', recoveryMail);
userRouter.post('/reset-password/:token', resetPassword);

export default userRouter