import express from "express";
import locationControllers from "../controller/locationControllers";
import bodyValidation from "../middlewares/bodyValidation";
import { newLocationSchema, updateLocationSchema } from "../validations/locationValidations";

const locationRoutes = express.Router();

locationRoutes.get("/get-all-locations", locationControllers.getAllLocations);
locationRoutes.post("/add-location", bodyValidation(newLocationSchema), locationControllers.saveNewLocation);
locationRoutes.put("/update-location/:_id", bodyValidation(updateLocationSchema), locationControllers.updateLocation);

export default locationRoutes;