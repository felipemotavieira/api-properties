import AppDataSource from "../data-source"
import { Property } from "../entitites/property.entity"
import { Schedules } from "../entitites/schedules_user_properties.entity"
import { User } from "../entitites/user.entity"
import { AppError } from "../errors/appError"
import { ISchedule, IScheduleRequest } from "../interfaces/schedules"

const createSchedulesService = async ({date, hour, propertyId}: IScheduleRequest, userId: string) => {
    const schedulesRepository = AppDataSource.getRepository(Schedules)
    const propertiesRepository = AppDataSource.getRepository(Property)
    const userRepository = AppDataSource.getRepository(User)

    const properties = await propertiesRepository.findOneBy({
        id: propertyId
    })

    if(!properties){
        throw new AppError("Invalid property", 404)
    }

    const dateTime = `${date} ${hour}`
    const scheduleDate = new Date(date)
    const scheduleTime = new Date(dateTime)

    if(scheduleDate.getDay() == 1 || scheduleDate.getDay() == 6){
        throw new AppError('Invalid date', 400)
    }

    if(scheduleTime.getHours() < 8){
        throw new AppError('Invalid hour', 400)
    }

    if(scheduleTime.getHours() > 17){
        throw new AppError('Invalid hour', 400)
    }

    const userIdFind = await userRepository.find({
        relations: {
            schedules: true,
        },
        where : {
            id: userId     
        }   
    })

    const propertyIdFind = await propertiesRepository.find({
        // relations: {
        //     schedules: true,
        // },
        where : {
            id: propertyId     
        }  
    })

    if(!userIdFind){
        throw new AppError('User not found', 404)
    }

    if(!propertyIdFind){
        throw new AppError('Property not found', 404)
    }
    const newSchedule = {
        date: date,
        hour: hour,
        property: propertyIdFind[0],
        user: userIdFind[0],
    }
    
    const schedulesFind = await schedulesRepository.find({
        relations: {
            user: true,
            property: true
        },
        where : {
            hour: hour,
            date: date,            
        }
    })

    if(schedulesFind[0]){        
        throw new AppError('Invalid hour', 400)
    }

    schedulesRepository.create(newSchedule)

    await schedulesRepository.save(newSchedule)
    return newSchedule
}

export default createSchedulesService