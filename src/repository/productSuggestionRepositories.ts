import productSuggestion from "../database/models/productSuggestion";

const createProductSuggestion = async (data: any)=>{
    return await productSuggestion.create(data)
}
const deleteProductSuggestion = async ( id: any )=>{
    return await productSuggestion.findByIdAndDelete(id)
}
const updateProductSuggestion = async (id: any, data: any)=>{
    return await productSuggestion.findByIdAndUpdate( id, data, {new: true} )
}
const findProductSuggestionByAttribute = async (key: any, value: any) =>{
    return await productSuggestion.findOne({ [key]: value })
}
const findAllProductSuggestions = async() =>{
    return await productSuggestion.find().sort({ createdAt: -1 })
}
export default {
    createProductSuggestion,
    deleteProductSuggestion,
    updateProductSuggestion,
    findProductSuggestionByAttribute,
    findAllProductSuggestions
}