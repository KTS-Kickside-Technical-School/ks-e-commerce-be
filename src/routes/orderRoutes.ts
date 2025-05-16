import express from "express"
import { isOrderExists, isSellerOrdersExists, isSellerSingleProductOrdersExists, isSingleProductOrderExists } from "../middlewares/orderMiddleware"
import orderController from "../controller/orderController"
import { userAuthorization } from "../middlewares/authorization"
import bodyValidation from "../middlewares/bodyValidation"
import { addSingleProductOrderProcess } from "../validations/ordersValidations"
import { isShopExistsBySeller } from "../middlewares/shopMiddlewares"

const ordersRoutes = express.Router()

ordersRoutes.put("/update-order-status", userAuthorization(["customer", "seller"]), isOrderExists, orderController.updateOrder)
ordersRoutes.get("/seller-view-orders", userAuthorization(["seller"]), isShopExistsBySeller, isSellerSingleProductOrdersExists, orderController.viewOrders);

ordersRoutes.put("/add-single-product-order-process", userAuthorization(["customer", "seller"]),
    bodyValidation(addSingleProductOrderProcess),
    isSingleProductOrderExists, orderController.addSingleProductOrderProcess)
ordersRoutes.get("/view-single-product-order-details/:orderId", isSingleProductOrderExists, orderController.viewSingleProductOrderDetails
)

export default ordersRoutes