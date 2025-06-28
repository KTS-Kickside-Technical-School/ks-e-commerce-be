import authRepositories from "../repository/authRepositories";
import authHelpers from "../helpers/authHelpers";
import { Response, Request } from "express";
import { hashPassword, decodeToken } from "../helpers/authHelpers";
import userRepositories from "../repository/userRepositories";
import { sendEmail } from "../service/emailServices";
import { generateToken } from "../helpers/authHelpers";
import bcrypt from 'bcrypt'
import { ExtendedRequest } from "../types/types";
import { iSession } from "../database/models/session";

export const FRONTEND_URL = process.env.FRONTEND_URL || 'https://kickside.shop';

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


const userForgotPassword = async (req: ExtendedRequest, res: Response): Promise<any> => {
    try {
        const user = req.user

        const resetToken = await generateToken(user._id);
        const resetTokenExpire = new Date(Date.now() + 3600000);

        const session = await authRepositories.saveSession({
            user: user._id,
            content: resetToken,
            expiresAt: resetTokenExpire,
        });

        const resetUrl = `${FRONTEND_URL}/reset-password?token=${resetToken}&email=${user?.email}`;

        const htmlContent = `
      <div style="font-family: Arial, sans-serif; color: #333;">
        <h2>Password Reset Request</h2>
        <p>Hi ${user.name || 'there'},</p>
        <p>You have requested to reset your password.</p>
        <p>
          <a href="${resetUrl}" style="background-color: #007bff; color: white; padding: 10px 15px; text-decoration: none; border-radius: 5px;">
            Reset Password
          </a>
        </p>
        <p>This link will expire in 1 hour.</p>
        <p>If the button above doesn't work, copy and paste the following link into your browser:</p>
        <p><a href="${resetUrl}">${resetUrl}</a></p>
        <br/>
        <p>Best regards,<br/><strong>Kickside Ecommerce Team</strong></p>
      </div>
    `;
        const subject = `Kickside Store – Password Reset`

        await sendEmail(req.user?.email, subject, subject, htmlContent);

        return res.status(200).json({
            status: 200,
            message: "Reset token sent successfully. Please check your inbox.",
        });

    } catch (error: any) {
        console.error('Error in forgot password:', error);
        return res.status(500).json({
            status: 500,
            message: error.message || "Internal Server Error",
        });
    }
};

const resetPassword = async (req: any, res: Response): Promise<any> => {
    try {
        const result = await checkResetTokenValidity(req.user?._id, req.body.token);
        if (!result.valid) {
            return res.status(401).json({
                status: 401,
                message: result.reason,
            });
        }

        req.body.password = await hashPassword(req.body.password)

        await authRepositories.deleteSession(result.session._id);

        await authRepositories.updateUserInfo(req.user._id, { password: req.body.password });

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

export const checkResetTokenValidity = async (userId: string, token: string) => {
    if (!userId || !token) {
        return {
            valid: false,
            reason: 'Missing user ID or token.',
        };
    }

    const session: any = await authRepositories.findSessionByUserIdAndToken(userId, token);

    if (!session) {
        return {
            valid: false,
            reason: 'The token is invalid or expired.',
        };
    }

    const isExpired = Date.now() > new Date(session?.expiresAt).getTime();

    if (isExpired) {
        return {
            valid: false,
            reason: 'The token is invalid or expired.',
        };
    }

    return {
        valid: true,
        reason: 'The token is valid.',
        session,
    };
};

const isResetTokenValid = async (req: ExtendedRequest, res: Response): Promise<any> => {
    try {
        const result = await checkResetTokenValidity(req.user?._id, req.body.token);

        if (!result.valid) {
            return res.status(401).json({
                status: 401,
                message: result.reason,
            });
        }

        return res.status(200).json({
            status: 200,
            message: result.reason,
        });

    } catch (error: any) {
        return res.status(500).json({
            status: 500,
            message: error.message || "Internal server error",
        });
    }
};

export default {
    userLogin,
    userLogout,
    newUserAccount,
    userForgotPassword,
    resetPassword,
    isResetTokenValid
}