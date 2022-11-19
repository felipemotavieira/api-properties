import { v4 as uuid4 } from "uuid"
import AppDataSource from "../data-source"
import { Adress } from "../entitites/adress.entity"
import { Category } from "../entitites/category.entity"
import { Property } from "../entitites/property.entity"
import { AppError } from "../errors/appError"
import { IAddressRequest, IPropertyRequest } from "../interfaces/properties"

const createPropertyService = async (isAdm: boolean, address: IAddressRequest, {value, size, categoryId}:IPropertyRequest) => {

    const propertyRepository = AppDataSource.getRepository(Property)
    const categoryRepository = AppDataSource.getRepository(Category)
    const addressRepository =  AppDataSource.getRepository(Adress)
    const addresses = await addressRepository.find()

    if(!isAdm){
        throw new AppError("User must be adm to access this route", 403)
    }

    const adressAlreadyExists = addresses.find(property => {
        const compareProp = {
            district: property.district,
            zipCode: property.zipCode,
            number: property.number,
            city: property.city,
            state: property.state
        }
    
        return JSON.stringify(compareProp) == JSON.stringify(address)
    })    

    const validCategoryId = await categoryRepository.findOneBy({
        id: categoryId        
    })

    if(!validCategoryId){
        throw new AppError("Category not found", 404)
    }

    if(adressAlreadyExists){
        throw new AppError("Property already exists", 400)
    }

    if(address.zipCode.length > 8){
        throw new AppError("Invalid zip code", 400)
    }

    if(address.state.length > 2){
        throw new AppError("Invalid state", 400)
    }

    const newAddress = {
        district: address.district,
        zipCode: address.zipCode,
        number: address.number,
        city: address.city,
        state: address.state
    }

    await addressRepository.save(newAddress)

    const newProperty = {
        value: value,
        size: size,
        category: validCategoryId,
        address: newAddress,
    }

    propertyRepository.create(newProperty)

    await propertyRepository.save(newProperty)

    return newProperty
}

export default createPropertyService