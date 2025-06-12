import express from 'express'
import authRoute from './authRoutes'
import userRoute from './userRoutes'
import shopRoute from "./shopRoutes";
import productRoute from './productRoutes';
import CategoryRoute from './categoryRoutes';
import cartRouter from './cartRoutes';
import paymentRoute from './paymentRoutes';
import invetoryRoute from './invetoryRoutes';
import productSuggestionRoute from './productSuggestionRoute';
import locationRoutes from './locationRoutes';

const indexRoute = express.Router()

indexRoute.use('/auth', authRoute)
indexRoute.use('/user', userRoute)
indexRoute.use("/shop", shopRoute);
indexRoute.use("/product", productRoute)
indexRoute.use("/category", CategoryRoute);
indexRoute.use("/cart", cartRouter);
indexRoute.use("/payment", paymentRoute)
indexRoute.use("/invetory", invetoryRoute)
indexRoute.use("/suggestion", productSuggestionRoute)
indexRoute.use("/location", locationRoutes);

export default indexRoute