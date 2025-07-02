import { Response, NextFunction } from "express";
import { ExtendedRequest } from "../types/types";
import shopRepositories from "../repository/shopRepositories";
import userRepositories from "../repository/userRepositories";
import { sendEmail } from "../service/emailServices";

const sellerCreateShop = async (
  req: ExtendedRequest,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    req.body.seller = req.user._id;
    const shop = await shopRepositories.saveSellerShop(req.body);
    return res.status(201).json({
      status: 201,
      message: "Shop created successfully",
      data: { shop },
    });
  } catch (error: any) {
    return res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};

const viewShopDetails = async (
  req: ExtendedRequest,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    return res.status(200).json({
      status: 200,
      message: "Shop details retireved successfully",
      data: { shop: req.shop },
    });
  } catch (error: any) {
    return res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};

const updateShopDetails = async (
  req: ExtendedRequest,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const response = await shopRepositories.updateShopDetails(
      req.shop?._id,
      req.body
    );
    return res.status(200).json({
      status: 200,
      message: "Shop details updated successfully",
      data: { shop: response },
    });
  } catch (error: any) {
    return res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};

const getAllShops = async (
  req: ExtendedRequest,
  res: Response
): Promise<any> => {
  try {

    return res.status(200).json({
      status: 200,
      message: "Shops Retrieved Successfully",
      data: { shops: req.shops },
    });
  } catch (error: any) {
    console.error("Error retrieving shops:", error);
    return res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};

const getSingleShop = async (
  req: ExtendedRequest,
  res: Response
): Promise<any> => {
  try {
    return res.status(200).json({
      status: 200,
      message: "Shop Retrieved Successfully",
      data: {
        shop: req.shop,
        products: req.products || [],
      },
    });
  } catch (error: any) {
    return res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};

const sellerOnboarding = async (
  req: ExtendedRequest, res: Response
): Promise<any> => {
  try {
    const updatedUser = await userRepositories.updateUserInfo(req.user._id,
      {
        email: req.body.seller.email,
        phone: req.body.seller.phone,
        fullNames: req.body.seller.fullNames,
        idDocument: req.body.seller.idDocument,
        isUserVerified: false,
      }
    )
    return res.status(200).json({
      status: 200,
      message: "Seller Onboarded Successfully, wait for the admin confirmation",
      data: {
        seller: updatedUser,
        shop: req.shop
      },
    });
  } catch (error: any) {
    return res.status(500).json({

    })
  }
}

const adminApproveShop = async (
  req: ExtendedRequest, res: Response
): Promise<any> => {
  try {
    const updatedShop = await shopRepositories.updateShopDetails(req.params.shopId, {
      isApproved: true,
      isWaitingForApproval: false,
      status: "active"
    });

    await userRepositories.updateUserInfo(req.shop?.seller?._id, {
      isUserVerified: true
    })

    await sendEmail(
      req.shop?.seller?.email,
      "🎉 Your Shop Has Been Approved - Kickside Store",
      `Your shop "${updatedShop?.name}" has officially been approved by our admin team.`,
      `    
        <p>We’re excited to let you know that your shop <strong>"${updatedShop?.name}"</strong> has been successfully reviewed and <span style="color:green; font-weight:bold;">approved</span>!</p>
    
        <p>You can now log in to your seller dashboard, list your products, manage orders, and start selling on <strong>Kickside Store</strong>.</p>
    
        <p>
          <a href="${process.env.CLIENT_URL}/login" 
             style="background-color:#2563EB; color:white; padding:10px 20px; text-decoration:none; border-radius:6px; display:inline-block;">
            Go to Dashboard
          </a>
        </p>
    
        <p>If you have any questions or need assistance, feel free to reach out to our support team.</p>
    
        <p>Thank you for choosing Kickside Store. We’re here to help you grow!</p>
    
        <br/>
        <p>Warm regards,<br/>
        The Kickside Store Team</p>
      `
    );

    return res.status(200).json({
      status: 200,
      message: "Shop Approved Successfully",
      data: {
        shop: updatedShop,
      },
    });
  } catch (error: any) {
    return res.status(500).json({
      status: 500,
      message: error.message || "Internal Server Error",
    });
  }
};

const adminRejectShop = async (req: ExtendedRequest, res: Response): Promise<any> => {
  try {
    const { reason } = req.body;

    const updatedShop = await shopRepositories.updateShopDetails(req.shop?._id, {
      status: "rejected",
      rejectReason: reason,
      isWaitingForApproval: false,
    });

    const sellerEmail = req.shop?.seller?.email;
    const shopName = req.shop?.name;

    await sendEmail(
      sellerEmail,
      "Shop Rejected - Kickside Store",
      `Your Shop "${shopName}" Has Been Rejected`,
      `
        <p>We regret to inform you that your shop <strong>"${shopName}"</strong> has been <span style="color:red;"><strong>rejected</strong></span> after review by our team.</p>

        <p><strong>Reason for Rejection:</strong></p>
        <blockquote style="background:#f8f9fa;padding:10px;border-left:4px solid #dc3545;">
          ${reason}
        </blockquote>

        <p>If you believe this was a mistake or you would like to appeal this decision, please reply to this email with additional clarification or supporting documents.</p>

        <p>We are here to help you meet our marketplace requirements and reapply if needed.</p>

        <p>Best regards,<br/>
        Kickside Store Team</p>
      `
    );

    return res.status(200).json({
      status: 200,
      message: "Shop Rejected Successfully",
      data: {
        shop: updatedShop,
      },
    });
  } catch (error: any) {
    return res.status(500).json({
      status: 500,
      message: error.message || "Internal Server Error",
    });
  }
};
const adminDisableShop = async (req: ExtendedRequest, res: Response): Promise<any> => {
  try {
    const { reason } = req.body;

    if (!req.shop || !req.shop._id || !req.shop.seller || !req.shop.seller.email) {
      return res.status(400).json({
        status: 400,
        message: "Invalid shop data. Cannot proceed with disabling.",
      });
    }

    const updatedShop = await shopRepositories.updateShopDetails(req.shop._id, {
      reason,
      isActive: false,
    });

    const subject = "Your Shop Has Been Disabled - Kickside Store";
    const title = `Shop "${req.shop.name}" Disabled`;

    const body = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; padding: 24px; background-color: #f9f9f9; border-radius: 8px;">
        <h2 style="color: #e53935; margin-bottom: 16px;">Your Shop Has Been Disabled</h2>
        <p style="font-size: 16px; color: #333;">
          Hello <strong>${req.shop.seller.fullNames || 'Seller'}</strong>,
        </p>
        <p style="font-size: 16px; color: #333;">
          We wanted to inform you that your shop <strong>"${req.shop.name}"</strong> has been <span style="color: #e53935;"><strong>disabled</strong></span> on the Kickside Store platform.
        </p>
        <p style="font-size: 16px; margin-top: 16px;"><strong>Reason:</strong></p>
        <div style="background-color: #fff3cd; padding: 12px; border-left: 4px solid #ffc107; margin-top: 8px; border-radius: 4px;">
          <p style="margin: 0; font-size: 15px; color: #555;">${reason}</p>
        </div>
        <p style="font-size: 15px; color: #333; margin-top: 24px;">
          If you believe this was a mistake or if you'd like to resolve this issue, please reach out to our support team.
        </p>
        <a href="mailto:support@kickside.rw" style="display: inline-block; margin-top: 12px; padding: 10px 20px; background-color: #1976d2; color: white; text-decoration: none; border-radius: 4px;">Contact Support</a>
        <p style="font-size: 14px; color: #999; margin-top: 32px;">
          — Kickside Store Admin Team
        </p>
      </div>
    `;

    await sendEmail(req.shop.seller.email, subject, title, body);

    return res.status(200).json({
      status: 200,
      message: "Shop disabled successfully",
      data: {
        shop: updatedShop,
      },
    });
  } catch (error: any) {
    return res.status(500).json({
      status: 500,
      message: error.message || "Internal Server Error",
    });
  }
};


export default {
  sellerCreateShop,
  viewShopDetails,
  updateShopDetails,
  getAllShops,
  getSingleShop,
  sellerOnboarding,
  adminApproveShop,
  adminRejectShop,
  adminDisableShop
};
