import User from "../database/models/user";
import Session from "../database/models/session";

const saveSession = async(data: any) =>{
    return await Session.create(data)
};
const findUserByAttribute = async (key: any, value: String) => {
    return await User.findOne({ [key]: value }).select("+password")
};
export const deleteSession = async (sessionId: any) => {
    return await Session.findByIdAndDelete(sessionId)
};
const findSessionByUserIdAndToken = async (user: any, content: any) => {
    return await Session.findOne({ user, content })
};
const updateUserInfo = async(id: any, data:any) =>{
    return await User.findByIdAndUpdate(id, data,{ new: true })
};

export default {
    saveSession,
    findUserByAttribute,
    deleteSession,
    findSessionByUserIdAndToken,
    updateUserInfo
}