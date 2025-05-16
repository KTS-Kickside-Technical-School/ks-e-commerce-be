import User from "../database/models/user";

const newUserAccount = async (data:any)=>{
    return await User.create(data)
};

const findUserByAttribute = async(key: any, value: string)=>{
    return await User.findOne({ [key]: value })
};
const updateUserInfo = async(id: any, data:any) =>{
    return await User.findByIdAndUpdate(id, data,{ new: true })
};

const findUserById = async(_id: any)=>{
    return await User.findById(_id)
};

const findAllUsers = async() =>{
    return await User.find().sort({ createdAt: -1 })
};
const deleteUser = async(_id: any)=>{
    return await User.findByIdAndDelete(_id)
};

export default {
    newUserAccount,
    findUserByAttribute,
    updateUserInfo,
    findUserById,
    findAllUsers,
    deleteUser
}