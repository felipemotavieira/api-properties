import AppDataSource from "../data-source"
import { Category } from "../entitites/category.entity"
import { Property } from "../entitites/property.entity"
import { Schedules } from "../entitites/schedules_user_properties.entity"
import { AppError } from "../errors/appError"

const listSchedulesByPropertyService = async (isAdm : boolean, propertyId: string) => {
    if(!isAdm){
        throw new AppError("User must be adm to access thies route", 403)
    }

    const propertyRepository = AppDataSource.getRepository(Property)
    const scheduleRepository = AppDataSource.getRepository(Schedules)

    const searchProperty = await scheduleRepository.findOne({
        relations: {
            user: true,
            property:true
        },
        where : {
            property: {id: propertyId}
        }  
    })

    if(!searchProperty){
        throw new AppError('Invalid id', 404)
    }

    return searchProperty
}

export default listSchedulesByPropertyService