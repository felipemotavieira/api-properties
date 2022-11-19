import { Request, Response } from "express";
import { Property } from "../entitites/property.entity";
import { IAddressRequest, IPropertyRequest } from "../interfaces/properties";
import createPropertyService from "../services/createPropertyService.service";

const createPropertyController = async (req: Request, res: Response) => {
    const property: IPropertyRequest = req.body
    const address: IAddressRequest = property.address
    const isAdm = req.user.isAdm
    
    const createdProperty = await createPropertyService(isAdm, address, property)
    
    return res.status(201).json(createdProperty)
}

export default createPropertyController