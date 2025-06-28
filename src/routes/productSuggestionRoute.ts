import express from 'express'
import bodyValidation from '../middlewares/bodyValidation'
import { productSuggestionSchema } from '../validations/productSuggestionValidations'
import productSuggestionsController from '../controller/productSuggestionsController'
import { isSuggestionExistById, validateSuggestionEmail } from '../middlewares/productSuggestionMiddlewares'
import { userAuthorization } from '../middlewares/authorization'


const productSuggestionRoute = express.Router()

productSuggestionRoute.post(
    "/create-product-suggestion",
    bodyValidation(productSuggestionSchema),
    validateSuggestionEmail,
    productSuggestionsController.createProductSuggestion
);
productSuggestionRoute.delete(
    "/delete-product-suggestion/:id",
    userAuthorization(["admin"]),
    isSuggestionExistById,
    productSuggestionsController.deleteProductSuggestion
);
productSuggestionRoute.put(
    "/update-product-suggestion/:id",
    isSuggestionExistById,
    productSuggestionsController.updateProductSuggestion
);
productSuggestionRoute.get(
    "/get-all-products-suggestions",
    userAuthorization(["admin"]),
    productSuggestionsController.getAllProductSuggestions
)

export default productSuggestionRoute