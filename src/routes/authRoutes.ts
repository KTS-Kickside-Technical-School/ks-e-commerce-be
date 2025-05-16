import express from "express";
import bodyValidation from "../middlewares/bodyValidation";
import { resendTokenSchema, userLoginSchema, userResetPasswordSchema } from "../validations/authValidation";
import authController from "../controller/authController";
import { isUserExists } from "../middlewares/authMidllewares";
import { userAuthorization } from "../middlewares/authorization";
import { isUserAlreadyExist } from '../middlewares/userMidllewares'
import { newUserSchema } from '../validations/userValidation'


const authRoute = express.Router();

authRoute.post("/login", bodyValidation(userLoginSchema), isUserExists, authController.userLogin);
authRoute.post("/logout", userAuthorization(["admin", "seller", "customer"]), authController.userLogout)
authRoute.post("/new-user-account", bodyValidation(newUserSchema), isUserAlreadyExist, authController.newUserAccount);
authRoute.post("/forgot-password", bodyValidation(resendTokenSchema), isUserExists, authController.resendResetToken)
authRoute.post("/reset-password", bodyValidation(userResetPasswordSchema), authController.resetPassword)

export default authRoute;