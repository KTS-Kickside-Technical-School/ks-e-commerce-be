import express from 'express'
import paymentController from '../controller/paymentController';
import { singleProductStripePaymentValidation, stripePaymentValidation } from '../validations/paymentValidation';
import bodyValidation from '../middlewares/bodyValidation';
import { userAuthorization } from '../middlewares/authorization';


const paymentRoute = express.Router();

paymentRoute.post("/user-pay-with-stripe", userAuthorization(["customer"]), bodyValidation(stripePaymentValidation), paymentController.createStripeCheckoutSession);

paymentRoute.post("/user-pay-single-product-with-stripe", userAuthorization(["customer"]), bodyValidation(singleProductStripePaymentValidation), paymentController.userPaySingleProductByStripe);

export default paymentRoute;