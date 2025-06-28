import Category from "../database/models/category";

const createCategory = async(data: any) =>{
    return await Category.create(data)
};
const findCategoryByAttribute = async (key: any, value: string) =>{
    return await Category.findOne ({ [key]: value })
};

const deleteCategory = async(_id: any) =>{
    return await Category.findByIdAndDelete(_id)
};

const findAllCategories = async() =>{
    return await Category.find().sort({ createdAt: -1 })
};

const updateCategory = async(id: any, data: any) =>{
    return await Category.findByIdAndUpdate( id, data, { new: true })
}

export default {
    createCategory,
    findCategoryByAttribute,
    deleteCategory,
    findAllCategories,
    updateCategory
}