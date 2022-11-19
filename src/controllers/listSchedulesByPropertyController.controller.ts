import { Request, Response } from 'express'
import listSchedulesByPropertyService from '../services/listSchedulesByPropertyService.service'

const listSchedulesByPropertyController = async (req: Request, res: Response) => {
    const isAdm = req.user.isAdm
    const propertyId = req.params.id

    const schedulesByProperty = await listSchedulesByPropertyService(isAdm, propertyId)
    const arr = []
    arr.push(schedulesByProperty)
    console.log(arr)
    return res.status(200).json({schedules: arr})
}

export default listSchedulesByPropertyController