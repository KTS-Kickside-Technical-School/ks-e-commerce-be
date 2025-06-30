import express from "express"
import bodyValidation from "../middlewares/bodyValidation"
import { newTermsSchema } from "../validations/termsAndConditionsValidations"
import termsAndConditionsController from "../controller/termsAndConditionsController"
import { isTermsAlreadyExists } from "../middlewares/termsAndConditionsMiddlewares"
import { userAuthorization } from "../middlewares/authorization"

const termsAndConditionsRouter = express.Router()

termsAndConditionsRouter.post("/new-terms", userAuthorization(["admin"]), bodyValidation(newTermsSchema), isTermsAlreadyExists, termsAndConditionsController.saveNewTermsAndConditions);
termsAndConditionsRouter.get("/admin-view-terms", userAuthorization(["admin"]), termsAndConditionsController.getAllTermsAndConditions);

export default termsAndConditionsRouter