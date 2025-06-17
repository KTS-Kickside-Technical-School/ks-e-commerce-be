import express from "express"
import { isCustomerTheOrderOwner, isOrderExistsById, isOrderExistsByTrackingCoode } from "../middlewares/orderMiddleware"
import orderController from "../controller/orderController"
import { userAuthorization } from "../middlewares/authorization"
import bodyValidation from "../middlewares/bodyValidation"
import { isShopExistsBySeller } from "../middlewares/shopMiddlewares"
import { saveOrderValidations, updateOrderValidations } from "../validations/ordersValidations"

const ordersRoutes = express.Router()

ordersRoutes.post("/save-order", userAuthorization(["customer"]), bodyValidation(saveOrderValidations), orderController.saveOrder);

ordersRoutes.get("/customer-get-single-order/:id", userAuthorization(["customer"]), isOrderExistsById, isCustomerTheOrderOwner, orderController.getSingleOrder);
ordersRoutes.put("/customer-update-order/:id", userAuthorization(["customer", "admin"]), bodyValidation(updateOrderValidations), isOrderExistsById, isCustomerTheOrderOwner, orderController.customerUpdateOrder);
ordersRoutes.get("/customer-get-orders", userAuthorization(["customer"]), orderController.customerGetOrders);

ordersRoutes.get("/admin-get-all-orders", userAuthorization(["admin"]), orderController.adminGetOrders)
ordersRoutes.get("/admin-get-single-order/:id", userAuthorization(["admin", "seller"]), isOrderExistsById, orderController.getSingleOrder);
ordersRoutes.put("/admin-update-order/:id", userAuthorization(["customer", "admin", "seller"]), bodyValidation(updateOrderValidations), isOrderExistsById, orderController.customerUpdateOrder);

ordersRoutes.get("/seller-get-shop-orders", userAuthorization(["seller"]), isShopExistsBySeller, orderController.getShopOrders);

ordersRoutes.get("/customer-track-order/:trackingCode", isOrderExistsByTrackingCoode, orderController.getSingleOrder);

export default ordersRoutes