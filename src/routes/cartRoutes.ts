import express from "express"
import bodyValidation from "../middlewares/bodyValidation";
import { addProductToCart, updateCartProduct } from "../validations/cartValidations";
import { userAuthorization } from "../middlewares/authorization";
import { isProductExists } from "../middlewares/productMiddlewares";
import { isCartProductsExists, isProductAlreadyInCart, isProductInCart, isProductsInCart } from "../middlewares/cartMiddleware";
import cartControllers from "../controller/cartControllers";

const cartRouter = express.Router()

cartRouter.post('/add-product-to-cart', userAuthorization(["customer"]), bodyValidation(addProductToCart), isProductExists, isProductAlreadyInCart, cartControllers.addProductToCart);
cartRouter.put("/update-cart", userAuthorization(["customer"]), bodyValidation(updateCartProduct), isProductExists, isProductInCart, cartControllers.customerUpdateCart);
cartRouter.delete("/remove-product-from-cart/:productId", userAuthorization(["customer"]), isProductExists, isProductInCart, cartControllers.customerRemoveProductFromCart);
cartRouter.delete("/clear-cart", userAuthorization(["customer"]), isProductsInCart, cartControllers.customerClearCart);
cartRouter.get("/get-cart-products", userAuthorization(["customer"]), isCartProductsExists, cartControllers.customerViewCartProducts)

export default cartRouter;