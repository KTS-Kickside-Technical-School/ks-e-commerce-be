import { Request, Response, NextFunction } from "express";
import { ExtendedRequest } from "../types/types";
import productSuggestionRepositories from "../repository/productSuggestionRepositories";

export const validateSuggestionEmail = async(
    req: ExtendedRequest, 
    res: Response, next: NextFunction): Promise<any>=> {
        try {
            const {email} = req.body;
            if(email && typeof email === 'string' && email.includes('@')) {
                return next();
            }
            return res.status(400).json({
                status: 400,
                message: "Invalid or missing email address in product suggestion."
            })
        } catch (error:any) {
            return res.status(500).json({
                status: 500,
                message: error.message
            })
            
        }
    };

export const isSuggestionExistById = async (req: any, res: Response, next: NextFunction): Promise<any> =>{
    try {
        const {id} = req.params || req.body;
        const suggestionExist = await productSuggestionRepositories.findProductSuggestionByAttribute("_id", id);
        if(!suggestionExist){
            return res.status(404).json({
                status: 404,
                message: "Suggestion Not Found",
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