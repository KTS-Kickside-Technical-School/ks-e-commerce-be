import express from "express"
import bodyValidation from "../middlewares/bodyValidation"
import { newTermsSchema } from "../validations/termsAndConditionsValidations"
import termsAndConditionsController from "../controller/termsAndConditionsController"
import { isTermsAlreadyExists, isTermExistsBySlug } from "../middlewares/termsAndConditionsMiddlewares"
import { userAuthorization } from "../middlewares/authorization"

const termsAndConditionsRouter = express.Router()

termsAndConditionsRouter.post("/new-terms", userAuthorization(["admin"]), bodyValidation(newTermsSchema), isTermsAlreadyExists, termsAndConditionsController.saveNewTermsAndConditions);
termsAndConditionsRouter.get("/admin-view-terms", userAuthorization(["admin"]), termsAndConditionsController.getAllTermsAndConditions);

termsAndConditionsRouter.get("/admin-view-single-terms/:slug", isTermExistsBySlug, termsAndConditionsController.viewSingleTermsAndConditions);
termsAndConditionsRouter.put("/admin-update-terms/:slug", userAuthorization(["admin"]), bodyValidation(newTermsSchema), isTermExistsBySlug, isTermsAlreadyExists, termsAndConditionsController.saveNewTermsAndConditionsUpdates);

termsAndConditionsRouter.get("/customers-view-terms", termsAndConditionsController.getActiveTermsAndConditions);

export default termsAndConditionsRouter