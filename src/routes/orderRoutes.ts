import express from "express"
import { isCustomerTheOrderOwner, isOrderExistsById } from "../middlewares/orderMiddleware"
import orderController from "../controller/orderController"
import { userAuthorization } from "../middlewares/authorization"
import bodyValidation from "../middlewares/bodyValidation"
import { isShopExistsBySeller } from "../middlewares/shopMiddlewares"
import { saveOrderValidations, updateOrderValidations } from "../validations/ordersValidations"

const ordersRoutes = express.Router()

ordersRoutes.post("/save-order", userAuthorization(["customer"]), bodyValidation(saveOrderValidations), orderController.saveOrder);
ordersRoutes.get("/customer-get-single-order/:id", userAuthorization(["customer"]), isOrderExistsById, isCustomerTheOrderOwner, orderController.getSingleOrder);
ordersRoutes.put("/customer-update-order/:id", userAuthorization(["customer"]), bodyValidation(updateOrderValidations), isOrderExistsById, isCustomerTheOrderOwner, orderController.customerUpdateOrder);
ordersRoutes.get("/customer-get-orders", userAuthorization(["customer"]), orderController.customerGetOrders)
export default ordersRoutes