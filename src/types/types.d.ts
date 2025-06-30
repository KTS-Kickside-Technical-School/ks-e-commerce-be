import { Request } from "express";
import IUser from "../database/models/user.ts";
import { IShop } from "../database/models/shop.js";
import { IProduct } from "../database/models/product.js";
import { ICategory } from "../database/models/category.js";
import { ICart } from "../database/models/cart.js";
import { IInvetory } from "../database/models/invetory.js";
import { ISingleProductOrders } from "../database/models/SingleProductOrder.js";
import { IOrder } from "../database/models/order.js";
import { IProductSuggestion } from "../database/models/productSuggestion.js";
import { ILocation } from "../database/models/locations.js";
import { iFeaturedShops } from "../database/models/featuredShops.js";
import { ITermsAndConditions } from "../database/models/termsAndConditions.js";
export interface ExtendedRequest extends Request {
  user?: IUser;
  shop?: IShop;
  shops?: IShop[];
  users?: IUser[];
  product?: IProduct;
  category?: ICategory;
  products?: IProduct[];
  cart?: ICart;
  cartProducts?: ICart[];
  carts?: ICart[];
  singleProductOrder?: ISingleProductOrders,
  singleProductOrders?: ISingleProductOrders[],
  invetory?: IInvetory;
  order?: IOrder;
  orders?: IOrder[];
  productSuggestion?: IProductSuggestion;
  productSuggestions?: IProductSuggestion[];
  locations?: ILocation[];
  location?: ILocation;
  featuredShop?: iFeaturedShops;
  featuredShops?: iFeaturedShops[];
  termAndCondition?: ITermsAndConditions,
  termsAndConditions?: ITermsAndConditions[]
}
