import { Property } from "../../entitites/property.entity"
import { User } from "../../entitites/user.entity"

export interface IScheduleRequest {
    userId: string
    propertyId: string
    date: string
    hour: string
}

export interface ISchedule {
    date: string
    hour: string
    property: Property | null;
    user: User | null;
}