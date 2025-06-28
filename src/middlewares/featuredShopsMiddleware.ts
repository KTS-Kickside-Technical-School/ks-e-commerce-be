import { NextFunction, Response } from "express";
import { ExtendedRequest } from "../types/types";
import mongoose from "mongoose";
import adsRepository from "../repository/adsRepository";

export const isFeaturedShopExistById = async (
    req: ExtendedRequest,
    res: Response,
    next: NextFunction
): Promise<any> => {
    try {

        const id = req.params.id;

        if (!id) {
            return res.status(400).json({
                status: 400,
                message: "Shop ID is required",
            });
        }

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                status: 400,
                message: "Invalid Shop ID format",
            });
        }

        const featuredShop = await adsRepository.getFeaturedShopByAttribute("_id", id);

        if (!featuredShop) {
            return res.status(404).json({
                status: 404,
                message: "Shop not found",
            });
        }

        req.featuredShop = featuredShop;
        return next();
    } catch (error: any) {
        console.error("Shop existence check error:", error);
        res.status(500).json({
            status: 500,
            message: "Internal Server Error",
        });
    }
};