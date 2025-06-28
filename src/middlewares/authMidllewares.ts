import { Response, NextFunction } from "express";
import authRepositories from "../repository/authRepositories";
import { ExtendedRequest } from "../types/types";

export const isUserExists = async (req: any, res: Response, next: NextFunction): Promise<any> => {
    try {
        const user = await authRepositories.findUserByAttribute("email", req.body.email)

        if (!user) {
            return res.status(404).json({
                status: 404,
                message: "User with this email doesn't exists!"
            })
        }
        req.user = user
        return next()
    } catch (error: any) {
        res.status(500).json({
            status: 500,
            message: error.message
        })
    }
}