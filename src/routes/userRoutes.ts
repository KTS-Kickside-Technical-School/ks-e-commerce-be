import express from "express";
import bodyValidation from "../middlewares/bodyValidation";
import userController from "../controller/userController";
import { userAuthorization } from "../middlewares/authorization";
import {
  isUserAlreadyExist,
  isUserExistsById,
  isDataChanged,
} from "../middlewares/userMidllewares";
import {
  createUserSchema,
  updateUserSchema,
  userDisableSchema,
  userUpdateProfileSchema,
} from "../validations/userValidation";
import authController from "../controller/authController";

const userRoute = express.Router();

userRoute.post(
  "/create-user-account",
  userAuthorization(["admin"]),
  bodyValidation(createUserSchema),
  isUserAlreadyExist,
  authController.newUserAccount
);

userRoute.put(
  "/update-userInfo",
  userAuthorization(["admin"]),
  bodyValidation(updateUserSchema),
  isUserExistsById,
  isDataChanged,
  userController.updateUserInfo
);

userRoute.get(
  "/get-all-users",
  userAuthorization(["admin"]),
  userController.getAllUsers
);
userRoute.get(
  "/get-single-user/:id",
  userAuthorization(["admin"]),
  userController.getSingleUser
);
userRoute.delete(
  "/delete-user/:id",
  userAuthorization(["admin"]),
  userController.deleteUser
);
userRoute.put(
  "/user-update", userAuthorization(["admin", "seller", "customer"]),
  bodyValidation(updateUserSchema),
  isUserExistsById,
  isDataChanged,
  userController.updateUserInfo
);

userRoute.put(
  "/disable-user",
  userAuthorization(["admin"]),
  bodyValidation(userDisableSchema),
  isUserExistsById,
  userController.disableUserAccount
)
userRoute.put(
  "/enable-user/:userId",
  userAuthorization(["admin"]),
  isUserExistsById,
  userController.enableDisabledUser
)

userRoute.put("/user-update-profile", userAuthorization(["admin", "seller", "customer"]), bodyValidation(userUpdateProfileSchema), userController.updateUserInfo);

export default userRoute;
