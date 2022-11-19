import { Request, Response } from 'express'
import listPropertyByCategoryService from '../services/listPropertyByCategoryService.service'

const listPropertyByCategoryController = async (req: Request, res: Response) => {
    const categoryId = req.params.id

    const propertiesByCategory = await listPropertyByCategoryService(categoryId)

    return res.status(200).json(propertiesByCategory)
}

export default listPropertyByCategoryController