import userRepositories from "../repository/userRepositories";
import { Response, Request } from "express";
import { ExtendedRequest } from "../types/types";
import { sendEmail } from "../service/emailServices";

const updateUserInfo = async (req: any, res: Response): Promise<any> => {
    try {
        const userData = req.body
        const updatedUser = await userRepositories.updateUserInfo(req.user._id, userData)
        return res.status(200).json({
            status: 200,
            message: " User information updated successfully",
            data: { updatedUser }
        })
    } catch (error: any) {
        return res.status(500).json({
            status: 500,
            message: error.message
        })
    }
};

const getAllUsers = async (req: any, res: Response): Promise<any> => {
    try {
        const users = await userRepositories.findAllUsers()
        return res.status(200).json({
            status: 200,
            message: "Users data retreived successfully",
            data: { users }
        })
    } catch (error: any) {
        return res.status(500).json({
            status: 500,
            message: error.message
        })
    }
};

const getSingleUser = async (req: any, res: Response): Promise<any> => {
    try {
        return res.status(200).json({
            status: 200,
            message: "User data retreived successfully",
            data: { user: req.user }
        })
    } catch (error: any) {
        return res.status(500).json({
            status: 500,
            message: error.message
        })

    }
};

const deleteUser = async (req: any, res: Response): Promise<any> => {
    try {
        const { id } = req.params
        const deletedUser = await userRepositories.deleteUser(id)
        return res.status(200).json({
            status: 200,
            message: "User deleted successfully",
            data: { deletedUser }
        })
    } catch (error: any) {
        return res.status(500).json({
            status: 500,
            message: error.message
        })

    }
};

const viewUsers = async (req: ExtendedRequest, res: Response): Promise<any> => {
    try {
        return res.status(200).json({
            status: 200,
            message: "Users retrieved successfully.",
            data: {
                users: req.users
            }
        })
    } catch (error: any) {
        return res.status(500).json({
            status: 500,
            message: error.message
        })
    }
};

const disableUserAccount = async (req: any, res: Response): Promise<any> => {
    try {
        if (req.body.isDisabled === true) {
            return res.status(400).json({
                status: 400,
                message: "User Already Disabled"
            })
        };
        const disabledUser = await userRepositories.updateUserInfo(req.user._id, { ...req.body, isDisabled: true })
        await sendEmail(req.user.email, "Account disabled.", 'Your account is temporary disabled',
            `
            <p><b>We've temporarily disabled your Kickside Ecommerce account </b></p>
            <p>Due to the following reason: </p>
            <p class="reason">${req.body.disableReason}</p>
            <p>We are honored to have you as part of our team, serving as a <b>${req.user.role}</b>. We truly appreciate the efforts you have contributed to our platform.</p>
            <p>If you believe this action was taken in error or you need further clarification, please contact our support team for assistance.</p>
            <p>We value your association with Kickside Ecommerce and hope to resolve any concerns promptly.</p>
            <p>Best regards,</p>
            <p><b>Kickside Ecommerce Rwanda Team</b></p>
            `);
        return res.status(200).json({
            status: 200,
            message: "Account Disabled Successfully",
            data: { disabledUser }
        })
    } catch (error: any) {
        return res.status(500).json({
            status: 500,
            message: error.message || " Internal server error"
        })
    }
};

const enableDisabledUser = async (req: any, res: Response): Promise<any> => {
    try {
        if (req.body.isDisabled === false) {
            return res.status(400).json({
                status: 400,
                message: "User Account Already Enabled"
            })
        }
        const enabledUser = await userRepositories.updateUserInfo(req.user._id, { ...req.body, isDisabled: false })
        await sendEmail(req.user.email, "User Account Enabled.", 'Your Account Is Enabled',
            `
             <p>We are delighted to inform you that your Kickside Ecommerce account has been re-enabled. It’s great to have you back with us!</p>
            <p>We appreciate your dedication and contribution as a valued  your role as: <b>${req.user.role}</b>. 
            <p>If you have any questions or encounter any issues, feel free to contact our support team. We’re here to assist you!</p>
            <p>Once again, welcome back, and we look forward to working with you!</p>
            <p>Best regards,</p>
            <p><b>Kickside Ecommerce Rwanda Team</b></p> `
        )
        return res.status(200).json({
            status: 200,
            message: "User Enabled Successfully",
            data: { enabledUser }
        })
    } catch (error: any) {
        return res.status(500).json({
            status: 500,
            message: error.message || "Internal Server Error"
        })

    }
};

export default {
    updateUserInfo,
    getSingleUser,
    getAllUsers,
    deleteUser,
    viewUsers,
    disableUserAccount,
    enableDisabledUser
}