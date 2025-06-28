import { Response } from "express";
import { ExtendedRequest } from "../types/types";
import adsRepository from "../repository/adsRepository";

const getFeaturedSHops = async (req: ExtendedRequest, res: Response): Promise<any> => {
    try {
        const featuredShops = await adsRepository.getAllFeaturedShops();

        return res.status(200).json({
            status: 200,
            message: "Featured shops fetched successfully",
            data: { featuredShops }
        });
    } catch (error) {
        console.error("Error fetching featured shops:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

const saveFeaturedShop = async (req: ExtendedRequest, res: Response): Promise<any> => {
    try {
        req.body.shop = req?.shop?._id;

        const featuredShop = await adsRepository.saveFeaturedShop(req.body);

        return res.status(201).json({
            status: 201,
            message: "Featured shop saved successfully",
            data: {
                featuredShop
            }
        });
    } catch (error) {
        console.error("Error saving featured shop:", error);
        return res.status(500).json({
            status: 500,
            message: "Internal server error"
        });
    }
}

const updateFeaturedShop = async (req: ExtendedRequest, res: Response): Promise<any> => {
    try {

        const update = await adsRepository.updateFeaturedShop(req.params.id, req.body);

        return res.status(200).json({
            status: 200,
            message: "Featured shop updated successfully",
            data: {
                featuredShop: update
            }
        });
    } catch (error) {
        console.error("ERROR: Updating the featured shop.")
        return res.status(500).json({
            status: 500,
            message: "Internal server error"
        })
    }
}

const getFeaturedShopsForCustomer = async (req: ExtendedRequest, res: Response): Promise<any> => {
    try {
        const featuredShops = await adsRepository.getCustomerFeaturedShops();

        return res.status(200).json({
            status: 200,
            message: "Featured shops retrieved successfully",
            data: { featuredShops }
        })
    } catch (error) {
        console.error("ERROR: Getting the featured shops for customers")
        return res.status(500).json({
            status: 500,
            message: "Internal Server error"
        })
    }
}
export default {
    getFeaturedSHops,
    saveFeaturedShop,
    updateFeaturedShop,
    getFeaturedShopsForCustomer
};