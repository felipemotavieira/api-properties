import { Request, Response } from "express";
import { ICategoryRequest } from "../interfaces/categories";
import createCategoryService from "../services/createCategoryService.service";

const createCategoryController = async (req: Request, res: Response) => {
    const category: ICategoryRequest = req.body
    const isAdm = req.user.isAdm
    const createdCategory = await createCategoryService(isAdm, category)

    return res.status(201).json(createdCategory)
}

export default createCategoryController