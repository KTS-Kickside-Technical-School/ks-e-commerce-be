import { Request, Response } from "express";
import invetoryRepository from "../repository/invetoryRepository";
import Invetory from "../database/models/invetory";
import { invetoryType } from "../database/models/invetory";
import productRepositories from "../repository/productRepositories";
import { ExtendedRequest } from "../types/types";

const getInventoryRecords = async (req: any, res: Response): Promise<any> => {
    try {
      const { shopId } = req.params;
      const inventoryRecords = await invetoryRepository.getInventoryRecordByShop(shopId);
  
      return res.status(200).json({
        status: 200,
        message: "Inventory records retrieved successfully",
        data: {inventoryRecords}
      });
    } catch (error: any) {
      return res.status(500).json({
        status: 500,
        message: error.message
      });
    }
  };
  
  const updateInvetoryStock = async (req: ExtendedRequest, res: Response): Promise<any> => {
    try {
        const { productId } = req.params;
        const { stock } = req.body; 
        const existingProduct = await productRepositories.findProductByAttribute("_id", productId);
        const oldStock = Number(existingProduct?.stock) || 0;

        const stockToAdd = Number(stock) || 0; 
        const newStock = oldStock + stockToAdd;

        const newStockAsString = newStock.toString();
        const updatedProduct = await productRepositories.updateProduct(productId, {
            stock: newStockAsString 
        });
        const recordType = stockToAdd > 0 ? invetoryType.PRODUCT_STOCK_IN : invetoryType.STOCK_OUT;

        await Invetory.create({
            shop: existingProduct?.shop,
            product: existingProduct?._id,
            type: recordType,
            description: `Stock updated from ${oldStock} to ${newStockAsString}`,
            oldData: { stock: oldStock },
            newData: { stock: newStockAsString }
        });

        return res.status(200).json({
            status: 200,
            message: "Product stock updated successfully",
            data: { updatedProduct, oldData: { stock: oldStock },
            newData: { stock: newStockAsString } }
        });
    } catch (error: any) {
        return res.status(500).json({
            status: 500,
            message: error.message
        });
    }
};

  const getInvetoryBySeller = async(req: any, res: Response): Promise<any> =>{
    try {
      const {sellerId} = req.params
      const sellerRecords = await invetoryRepository.getInvetoryRecordsBySeller(sellerId)
      return res.status(200).json({
        status: 200,
        message: "Seller Invetory Records Retreived Successfully",
        data: {sellerRecords}
      });

    } catch (error: any) {
      return res.status(500).json({
        status: 500,
        message: error.message
      })
    }
  };

  const getAllInventoryGroupedBySeller = async(req: any, res: Response): Promise<any> =>{
    try {
      const invetoryData = await invetoryRepository.getAllInventoryGroupedBySeller();
      return res.status(200).json({
        status: 200,
        message: "Inventory records grouped by seller fetched successfully",
        data: { invetoryData }
      })
    } catch (error: any) {
      return res.status(500).json({
        status: 500,
        message: error.message
      })
      
    }
  };

  export default {
    getInventoryRecords,
    updateInvetoryStock,
    getInvetoryBySeller,
    getAllInventoryGroupedBySeller
  };