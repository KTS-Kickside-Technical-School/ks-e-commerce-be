import authRepositories from "../repository/authRepositories";
import authHelpers from "../helpers/authHelpers";
import { Response, Request } from "express";
import { hashPassword, decodeToken} from "../helpers/authHelpers";
import userRepositories from "../repository/userRepositories";
import { sendEmail } from "../service/emailServices";
import { generateToken } from "../helpers/authHelpers";
import bcrypt from 'bcrypt'


const userLogin = async (req: any, res: Response): Promise<any> => {
    try {
        const { password } = req.body
        const isPasswordMatch = await authHelpers.comparePassword(password, req.user.password)
        if (!isPasswordMatch) {
            return res.status(401).json({
                status: 401,
                message: "Invalid password or email"
            })

        }

        if (req.user.isDisabled === true) {
            return res.status(401).json({
                status: 401,
                message: "Unable to login your account has been disabled. Please contact administration"
            })
        }
        const token = await authHelpers.generateToken(req.user._id);
        const session = await authRepositories.saveSession({
            user: req.user._id,
            content: token
        })
        return res.status(200).json({
            status: 200,
            message: "User Login Successfully",
            user: req.user,
            session
        })
    } catch (error: any) {
        return res.status(500).json({
            status: 500,
            message: error.message
        })

    }
};

export const userLogout = async (req: any, res: Response): Promise<any> => {
    try {
        await authHelpers.destroyToken(req.session.content)
        await authRepositories.deleteSession(req.session._id)
        return res.status(200).json({
            status: 200,
            message: "User Logout Successfully"
        })
    } catch (error: any) {
        return res.status(500).json({
            status: 500,
            message: error.message
        })

    }
}


const newUserAccount = async (req: any, res: Response): Promise<any> => {
    try {
        const user = req.body;
        req.body.password = await hashPassword(req.body.password)
        const userData = await userRepositories.newUserAccount(user)
        return res.status(201).json({
            status: 201,
            message: "User Created Successfully",
            data: { userData }
        })
    } catch (error: any) {
        return res.status(500).json({
            status: 500,
            message: error.message
        })

    }
};
const resendResetToken = async(req: any, res: Response): Promise<any> =>{
    try {
        const {email} = req.body;
        const resetToken = await generateToken(req.user._id)
        const resetTokenExpire = new Date(Date.now() + 3600000)
        const session = await authRepositories.saveSession({user: req.user._id, content: resetToken})
        await sendEmail(email,"Password reset request", 'Password Reset processing', 
            `<p>You have request to reset your password,
             Token to reset your password (<b>${resetToken}<b> <br> expired in  ${resetTokenExpire}). This link expires in 1 hour.</p>
            <br/>
            Best regards,
            <br/>
           <b> Kickside Ecommerce Team</b>
            </p>`
        )
        return res.status(200).json({
            status: 200,
            message: "Reset Token sent successfully",
            data: {session}
        })

    } catch (error: any) {
        return res.status(500).json({
            status: 500,
            message: error.message
        })
    }
};

const resetPassword = async (req: any, res: Response): Promise<any> => {
    try {
        const { token, newPassword } = req.body;

        const decoded: any = decodeToken(token);
        if (!decoded || !decoded._id) {
            return res.status(400).json({
                status: 400,
                message: "Invalid or expired token"
            });
        }

        const user = await userRepositories.findUserByAttribute("_id", decoded._id);
        if (!user) {
            return res.status(400).json({
                status: 400,
                message: "Invalid token or user not found"
            });
        }

        const session = await authRepositories.findSessionByUserIdAndToken(user._id, token);
        if (!session) {
            return res.status(400).json({
                status: 400,
                message: "Token expired or invalid"
            });
        }

        await authRepositories.deleteSession(session._id);        
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

        await authRepositories.updateUserInfo(user._id, { password: hashedPassword });

        return res.status(200).json({
            status: 200,
            message: "Password reset successfully"
        });

    } catch (error: any) {
        return res.status(500).json({
            status: 500,
            message: error.message
        });
    }
};



export default {
    userLogin,
    userLogout,
    newUserAccount,
    resendResetToken,
    resetPassword
}