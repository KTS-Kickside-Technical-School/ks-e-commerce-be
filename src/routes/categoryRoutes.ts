import express from 'express'
import bodyValidation from '../middlewares/bodyValidation'
import { userAuthorization } from '../middlewares/authorization'
import { createCategorySchema, updateCategorySchema } from '../validations/categoryValidation'
import { isCategoryAlreadyExist, isCategoryExistById, isDataProvided } from '../middlewares/categoryMiddlewares'
import categoryController from '../controller/categoryController'

const CategoryRoute = express.Router()

CategoryRoute.post(
    "/create-category", userAuthorization(["admin"]),
    bodyValidation(createCategorySchema), isCategoryAlreadyExist,
    categoryController.createCategory
 );

CategoryRoute.delete(
    "/delete-category/:id", userAuthorization(["admin"]),
    isCategoryExistById, categoryController.deleteCategory
 );
CategoryRoute.get(
    "/get-all-categories", userAuthorization(["admin","seller"]),
    categoryController.getAllCategory
 );
 CategoryRoute.get(
    "/get-single-category/:id", userAuthorization(["admin"]),
    categoryController.getSingleCategory
 );

 CategoryRoute.put(
    "/update-category/:id", userAuthorization(["admin"]),
    bodyValidation(updateCategorySchema),isCategoryExistById,
    isDataProvided,categoryController.updateCategory
)

export default CategoryRoute