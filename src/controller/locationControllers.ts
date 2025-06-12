import locationRepositories from "../repository/locationRepositories";
import { ExtendedRequest } from "../types/types";

const getAllLocations = async (req: ExtendedRequest, res: any): Promise<any> => {
    try {
        const locations = await locationRepositories.getAllLocations();

        return res.status(200).json({
            status: 200,
            message: "Locations fetched successfully",
            data: { locations }
        });
    } catch (error: any) {
        return res.status(500).json({
            message: "An error occurred while fetching locations",
            error: error.message
        })
    }
}

const saveNewLocation = async (req: ExtendedRequest, res: any): Promise<any> => {
    try {

        const location = await locationRepositories.saveLocation(req.body);
        return res.status(201).json({
            status: 201,
            message: "Location saved successfully",
            data: { location }
        });
    } catch (error: any) {
        console.log(error)
        return res.status(500).json({
            message: "An error occurred while saving location",
            error: error.message
        });
    }
}

const updateLocation = async (req: ExtendedRequest, res: any): Promise<any> => {
    try {
        const { _id } = req.params;
        const updatedLocation = await locationRepositories.updateLocation(_id, req.body);
        return res.status(200).json({
            status: 200,
            message: "Location updated successfully",
            data: { updatedLocation }
        });
    } catch (error: any) {
        return res.status(500).json({
            message: "An error occurred while updating location",
            error: error.message
        });
    }
}

export default {
    getAllLocations,
    saveNewLocation,
    updateLocation
}