import { Response } from "express";
import { ExtendedRequest } from "../types/types";
import termsAndConditionsRepository from "../repository/termsAndConditionsRepository";
import { date } from "joi";

const saveNewTermsAndConditions = async (req: ExtendedRequest, res: Response): Promise<any> => {
    try {
        req.body.effectiveDate = new Date();

        const terms = await termsAndConditionsRepository.saveTermsAndConditions(req.body);
        return res.status(201).json({
            status: 201,
            message: "The terms and conditions saved successfully",
            data: {
                terms
            }
        })
    } catch (error: any) {
        console.error("Error saving new terms and conditions:", error);
        return res.status(200).json({
            status: 200,
            message: "An unknown error occured saving new terms and COnditions"
        })
    }
}

const getAllTermsAndConditions = async (req: ExtendedRequest, res: Response): Promise<any> => {
    try {
        const terms = await termsAndConditionsRepository.findAllTermsAndConditions();

        return res.status(200).json({
            status: 200,
            message: "Terms and conditions fetched successfully",
            data: {
                terms
            }
        });
    } catch (error: any) {
        console.error("Error fetching terms and conditions:", error);
        return res.status(500).json({
            status: 500,
            message: "An unknown error occurred while fetching terms and conditions"
        });
    }
}

export default {
    saveNewTermsAndConditions,
    getAllTermsAndConditions

}