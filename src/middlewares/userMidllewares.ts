import userRepositories from "../repository/userRepositories";
import { Response, Request, NextFunction } from "express";
import {isEqual, omit, Omit} from 'lodash'

export const isUserAlreadyExist = async(req: any, res: Response, next: NextFunction): Promise<any> =>{
    try {
        const user = await userRepositories.findUserByAttribute(
            "email", req.body.email
        )
        if (user){
            return res.status(400).json({
                status: 400,
                message: "User with this email already exists"
            })
        }
        next();
    } catch (error: any) {
        return res.status(500).json({
            status: 500,
            message: error.message
        })
        
    }
};

export const isUserExistsById = async (req: any, res: Response, next: NextFunction): Promise<any> => {
        try {
            const id = req.body._id || req.params.userId
            const user = await userRepositories.findUserByAttribute("_id", id);
            if (!user) {
                return res.status(404).json({
                    status: 404,
                    message: "User not found"
                })
            }
            req.user = user;
            return next();
        } catch (error: any) {
            console.error("Error checking user existences", error);
            res.status(500).json({
                status: 500,
                message: error.message
            })
        }
    };

export const isDataChanged = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const userId = req.body._id || req.params.userId;

        if (!userId) {
        return res.status(400).json({
            status: 400,
            message: "User ID is required",
        });
        }

        const updatedData = req.body;
        const existingUser = await userRepositories.findUserByAttribute("_id", userId);

        if (!existingUser) {
        return res.status(404).json({
            status: 404,
            message: "User not found",
        });
        }
        const existingDataObject = omit(existingUser.toObject(), ["_id", "__v", "createdAt", "updatedAt"]);
        const updatedDataObject = omit(updatedData, ["_id", "__v", "createdAt", "updatedAt"]);

        if (updatedData.email && updatedData.email !== existingUser.email) {
        const emailExists = await userRepositories.findUserByAttribute("email", updatedData.email);
        if (emailExists) {
            return res.status(400).json({
                status: 400,
                message: "This email is already in use. Please try another email.",
            });
        }
        }

        if (isEqual(existingDataObject, updatedDataObject)) {
        return res.status(200).json({
            status: 200,
            message: "No changes detected. Proceeding...",
        });
        }

        next();
    } catch (error: any) {
        return res.status(500).json({
        status: 500,
        message: error.message,
        });
        }
};
export default {
    isUserAlreadyExist,
    isUserExistsById,
    isDataChanged
}