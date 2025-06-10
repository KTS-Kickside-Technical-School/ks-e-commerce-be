import Location, { ILocation } from "../database/models/locations";

const getAllLocations = async () => {
    return await Location.find({}).sort({
        code: 1,
        country: 1,
        city: 1,
        createdAt: 1
    })
}

const saveLocation = async (data: ILocation) => {
    return await Location.create(data);
}

const updateLocation = async (_id: string, data: ILocation) => {
    return await Location.findByIdAndUpdate(_id, data, {
        new: true,
        runValidators: true
    });
}

const getLocationById = async (_id: string) => {
    return await Location.findById(_id);
}

export default {
    saveLocation,
    getAllLocations,
    updateLocation,
    getLocationById
}