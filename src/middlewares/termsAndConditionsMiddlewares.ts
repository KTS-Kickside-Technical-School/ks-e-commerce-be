import { NextFunction, Response } from "express";
import { ExtendedRequest } from "../types/types";
import termsAndConditionsRepository from "../repository/termsAndConditionsRepository";
import TermsAndConditions from "../database/models/termsAndConditions";

export const isTermsAlreadyExists = async (req: ExtendedRequest, res: Response, next: NextFunction): Promise<any> => {
    try {
        const { version, title, content, summary, isActive, type } = req.body;

        const existing = await termsAndConditionsRepository.findTermsBy2Attributes("version", "title", version, title);

        if (existing && existing.content === content && existing.summary === summary && isActive === existing.isActive && type === existing.type) {
            return res.status(400).json({
                status: 400,
                message: "These terms and conditions already exist and have not changed.",
            });
        }

        return next();
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: "Unknown error occurred.",
        });
    }
};


export const isTermExistsBySlug = async (req: ExtendedRequest, res: Response, next: NextFunction): Promise<any> => {
    try {
        const { slug } = req.params;

        const existing = await termsAndConditionsRepository.findTermsByAttribute("slug", slug);

        if (!existing) {
            return res.status(404).json({
                status: 404,
                message: "These terms and conditions doesn't exists.",
            });
        }
        req.termAndCondition = existing
        return next();
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: "Unknown error occurred.",
        });
    }
}