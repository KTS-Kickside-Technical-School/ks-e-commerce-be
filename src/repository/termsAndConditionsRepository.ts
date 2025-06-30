import TermsAndConditions from "../database/models/termsAndConditions"

const findTermsBy2Attributes = async (key1: any, key2: any, value1: any, value2: any) => {
    return await TermsAndConditions.findOne({
        [key1]: value1,
        [key2]: value2
    })
}

const saveTermsAndConditions = async (terms: any) => {
    return await TermsAndConditions.create(terms)
}

const findAllTermsAndConditions = async () => {
    return await TermsAndConditions.find()
}

export default {
    findTermsBy2Attributes,
    saveTermsAndConditions,
    findAllTermsAndConditions
}