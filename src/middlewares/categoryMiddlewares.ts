import categoryRepositoies from "../repository/categoryRepositoies";
import { Request, Response, NextFunction } from "express";
import { ExtendedRequest } from "../types/types";
import productRepositories from "../repository/productRepositories";

export const isCategoryAlreadyExist = async(req: any, res: Response, next: NextFunction): Promise<any> =>{
    try {
        const {name} = req.body
        const existingCategory = await categoryRepositoies.findCategoryByAttribute(
            "name", name
        );
        if(existingCategory){
            return res.status(400).json(
                {
                    status: 400,
                    message: "Category already exist"
                }
            )
        };
        next();
    } catch (error: any) {
        return res.status(500).json({
            status: 500,
            message: error.message
        })
    }
};

export const isCategoryExistById = async(req: any, res: Response, next: NextFunction): Promise<any> =>{
    try {
        const {id} = req.params || req.body
        const category = await categoryRepositoies.findCategoryByAttribute("_id", id)
        if(!category){
            return res.status(404).json({
                status: 404,
                message: "Category not found"
            })
        }
        next();
        } catch (error: any) {
        return res.status(500).json({
            status: 500,
            message: error.message
        })
        
    }
}
export const isDataProvided = async(req: any, res: Response, next: NextFunction): Promise<any> =>{
    try {
        const categoryData  = req.body;
        if (!categoryData || Object.keys(categoryData).length === 0) {
            return res.status(400).json({
                status: 400,
                message: "No data provided for update"
            });
        }
        next()
    } catch (error: any) {
        return res.status(500).json({
            status: 500,
            message: error.message
        })
        
    }
};

export const isCategoryHaveProducts = async(
    req: ExtendedRequest,
    res: Response,
    next: NextFunction
): Promise<any>=>{
    try {
        const products = await productRepositories.userFindProductsByAttribute(
            "category",
            req.category?.name
        );
        
        req.products = products;
        return next();
    } catch (error: any) {
        return res.status(500).json({
            status: 500,
            message: error.message
        })
        
    }
};
export const isCategoryExistByName = async(
    req: any,
    res:Response,
    next: NextFunction
): Promise<any> =>{
    try {
        const {name} = req.params || req.body;
        const categoryExist = await categoryRepositoies.findCategoryByAttribute(
            "name", name
        )
        if(!categoryExist){
            return res.status(404).json({
                status: 404,
                message: `Category with that name ${name} not exists`
            })
        };
        return next();
    } catch (error: any) {
        return res.status(500).json({
            status: 500,
            message: error.message
        })
        
    }
}
export default {
    isCategoryAlreadyExist,
    isCategoryExistById,
    isDataProvided
}