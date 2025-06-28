import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const hashPassword = async(password: string) =>{
    return await bcrypt.hash(password, 10)
};

export const generateToken = async (_id: any) => {
    return await jwt.sign({ _id }, process.env.JWT_SECRET as string);
};

export const decodeToken = (token: string): any | null =>{
    try {
        const secret = process.env.JWT_SECRET;
        if(!secret){
            throw new Error ("JWT_SECRET is not defined in the environment variables")
        }
        return jwt.verify(token, secret);
    } catch (error) {
        console.error("Token Verification Error:", (error as Error).message);
        return {
            status: 401,
            message: "Token Verifaction Failed"
        }
        
    }
};

export const comparePassword = async(password: string, hashedPassword: string) =>{
    return await bcrypt.compare(password, hashedPassword)
};
const blacklist = new Set<string>();

export const destroyToken = async (token: string) => {
    blacklist.add(token); 
};

export default {
    hashPassword,
    generateToken,
    decodeToken,
    comparePassword,
    destroyToken
}