import { Request, Response } from 'express'
import listPropertyService from '../services/listPropertiesService.service'

const listPropertyController = async (req: Request, res: Response) => {
    const properties = await listPropertyService()

    return res.status(200).json(properties)
}

export default listPropertyController