import categoryRepositoies from "../repository/categoryRepositoies";
import { Response, Request } from "express";

const createCategory = async(req: any, res: Response): Promise<any> =>{
    try {
        const category = req.body
        const categoryData = await categoryRepositoies.createCategory(category)
        return res.status(201).json({
            status: 201,
            message: "Category created successfully",
            data: {categoryData}
        })
    } catch (error: any) {
        return res.status(500).json({
            status: 500,
            message: error.message
        })
    }
};

const deleteCategory = async(req: any, res: Response ): Promise<any> =>{
    try {
        const {id} = req.params
        const deletedCategory = await categoryRepositoies.deleteCategory(id)
        return res.status(200).json({
            status: 200,
            message: "Category deleted successfully ",
            data: { deletedCategory}
        })
    } catch (error: any) {
        return res.status(500).json({
            status: 500,
            message: error.message
        })
        
    }
};

const getAllCategory = async(req: any, res: Response): Promise<any>=>{
    try {
        const categories = await categoryRepositoies.findAllCategories()
        return res.status(200).json({
            status: 200,
            message: "Categories retreived successfully",
            data: {categories}
        })
    } catch (error: any) {
        return res.status(500).json({
            status:500,
            message: error.message
        })
    }
};

const getSingleCategory =async (req: any, res: Response): Promise<any> =>{
    try {
        const {id} = req.params
        const category = await categoryRepositoies.findCategoryByAttribute("_id", id)
        return res.status(200).json({
            status: 200,
            message: "Category data retreived successfully",
            data: {category}
        })
    } catch (error: any) {
        return res.status(500).json({
            status: 500,
            message: error.message
        })
    }
};

const updateCategory = async (req: any, res: Response): Promise<any> => {
    try {
        const { id } = req.params;
        const categoryData  = req.body;
        const updatedData = await categoryRepositoies.updateCategory(id, categoryData);
        return res.status(200).json({
            status: 200,
            message: "Category updated successfully",
            data: { updatedData }
        });
    } catch (error: any) {
        return res.status(500).json({
            status: 500,
            message: error.message || "Internal Server Error"
        });
    }
};

export default {
    createCategory,
    deleteCategory,
    getAllCategory,
    getSingleCategory,
    updateCategory
}