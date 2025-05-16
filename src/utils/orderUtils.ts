import { IAddress } from '../database/models/user';

export const getPrimaryShippingAddress = (addresses: IAddress[]): IAddress | undefined =>
    addresses.find(addr => addr.isPrimary === true);
