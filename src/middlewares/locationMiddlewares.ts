import { NextFunction, Response } from "express";
import { ExtendedRequest } from "../types/types";
import locationRepositories from "../repository/locationRepositories";

const isLocationExists = async (req: ExtendedRequest, res: Response, next: NextFunction): Promise<any> => {
    try {
        const { _id } = req.params;

        const location = await locationRepositories.getLocationById(_id);
        if (!location) {
            return res.status(404).json({
                status: 404,
                message: "Location not found",
            });
        }
        req.location = location;
    } catch (error: any) {
        return res.status(500).json({
            status: 500,
            message: error.message || "An error occurred while checking if location exists",
        })
    }
}