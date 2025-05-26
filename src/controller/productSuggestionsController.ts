import productSuggestionRepositories from "../repository/productSuggestionRepositories";
import { Request, Response } from "express";
import { ExtendedRequest } from "../types/types";
import { sendEmail } from "../service/emailServices";

const createProductSuggestion = async (req: ExtendedRequest, res: Response): Promise<any> => {
    try {
        const data = req.body;
        const suggestionData = await productSuggestionRepositories.createProductSuggestion(data);
        if (data.email) {
            const subject = "Kickside Product Suggestion Accepted";
            const title = "Thank You for Your Suggestion!";
            const htmlContent = `
                <div style="font-family: Arial, sans-serif; color: #333;">
                <h2>Product Suggestion</h2>
                <p>We’ve received your suggestion regarding a new product for our store. </p>
                <p>Our team will review it and get back to you within 1–2 business days. </p>
                <p>We truly appreciate your input in helping us improve Kickside Store.</p>
                <br /><br />
                <p>Stay connected with us for more updates and thank you for being part of the Kickside community!</p>
                <p>Best regards,<br/><strong>Kickside Ecommerce Team</strong></p>
                </div>
            `;

            await sendEmail(data.email, subject, title, htmlContent);
        }

        return res.status(201).json({
            status: 201,
            message: "Product Suggestion Submitted Successfully",
            data: { suggestionData }
        });

    } catch (error: any) {
        console.error("Error in createProductSuggestion:", error.message);
        return res.status(500).json({
            status: 500,
            message: error.message
        });
    }
};

const updateProductSuggestion = async(req: any, res: Response): Promise<any> =>{
    try {
        const {id} = req.params;
        const updateData = req.body;
        const updatedData = await productSuggestionRepositories.updateProductSuggestion(id,updateData)
        return res.status(200).json({
            status: 200,
            message: "Product Suggestion Updated Successfully",
            data: {updatedData}
        })
    } catch (error: any) {
        return res.status(500).json({
            status: 500,
            message: error.message
        })
    }
};

const deleteProductSuggestion = async(req: any, res: Response): Promise<any> =>{
    try {
        const {id} = req.params
        const deletedSuggestion = await productSuggestionRepositories.deleteProductSuggestion(id)
        return res.status(200).json({
            status: 200,
            message: "Suggestion Deleted Successfully",
            data: {deletedSuggestion}
        })
    } catch (error: any) {
        return res.status(500).json({
            status: 500,
            message: error.message
        })
        
    }
};
const getAllProductSuggestions = async(req:ExtendedRequest, res: Response): Promise<any> =>{
    try {
        const suggestions = await productSuggestionRepositories.findAllProductSuggestions()
        return res.status(200).json({
            status: 200,
            message: "Suggestions Retreived Successfully",
            data: {suggestions}
        })
    } catch (error: any) {
        return res.status(500).json({
            status: 500,
            message: error.message
        })
    }
}

export default {
    createProductSuggestion,
    updateProductSuggestion,
    deleteProductSuggestion,
    getAllProductSuggestions
}