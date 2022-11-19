import { Request, Response } from 'express'
import createSchedulesService from '../services/createSchedulesService.service'

const createSchedulesController = async (req: Request, res: Response) => {
    const userId = req.user.id
    const propertyInfo = req.body

    const createdSchedule = await createSchedulesService(propertyInfo, userId)

    return res.status(201).json({message: createdSchedule})
}

export default createSchedulesController