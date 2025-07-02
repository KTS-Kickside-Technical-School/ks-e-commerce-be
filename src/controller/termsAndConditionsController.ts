import { Response } from "express";
import { ExtendedRequest } from "../types/types";
import termsAndConditionsRepository from "../repository/termsAndConditionsRepository";
import { date } from "joi";

const saveNewTermsAndConditions = async (req: ExtendedRequest, res: Response): Promise<any> => {
    try {
        let slug = req.body.title
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, '')
            .trim()
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            + `-${req.body.version}`
            + '-' + new Date().getTime();

        req.body.effectiveDate = new Date();
        req.body.slug = slug.slice(0, 50);

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

const viewSingleTermsAndConditions = async (req: ExtendedRequest, res: Response): Promise<any> => {
    try {
        return res.status(200).json({
            status: 200,
            message: "Terms and conditions fetched successfully",
            data: {
                terms: req.termAndCondition
            }
        });
    } catch (error: any) {
        console.error("Error fetching single terms and conditions:", error);
        return res.status(500).json({
            status: 500,
            message: "An unknown error occurred while fetching single terms and conditions"
        });
    }
}

const saveNewTermsAndConditionsUpdates = async (req: ExtendedRequest, res: Response): Promise<any> => {
    try {
        if (req.termAndCondition && req.body.version === req.termAndCondition.version) {
            const currentVersion = req.termAndCondition.version.replace(/^v/i, '');
            const versionParts = currentVersion.split('.').map((n) => parseInt(n, 10));

            if (versionParts.some(isNaN)) {
                return res.status(400).json({
                    status: 400,
                    message: 'Invalid version format. Should be like v1.0 or v1.0.3'
                });
            }

            versionParts[versionParts.length - 1] += 1;
            req.body.version = 'v' + versionParts.join('.');
        }

        const slug = req.body.title
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, '')
            .trim()
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            + `-${req.body.version}`
            + '-' + Date.now();

        req.body.effectiveDate = new Date();
        req.body.slug = slug.slice(0, 80);

        const terms = await termsAndConditionsRepository.saveTermsAndConditions(req.body);

        return res.status(200).json({
            status: 200,
            message: "The terms and conditions saved successfully",
            data: { terms }
        });
    } catch (error: any) {
        console.error("Error saving new terms and conditions:", error);
        return res.status(500).json({
            status: 500,
            message: "An unknown error occurred while saving new terms and conditions"
        });
    }
};

const getActiveTermsAndConditions = async (req: ExtendedRequest, res: Response): Promise<any> => {
    try {
        const terms = await termsAndConditionsRepository.findTermsAndConditionsByAttribute("isActive", true);

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
    getAllTermsAndConditions,
    viewSingleTermsAndConditions,
    saveNewTermsAndConditionsUpdates,
    getActiveTermsAndConditions
}