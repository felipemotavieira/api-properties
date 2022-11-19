import { v4 as uuid4 } from "uuid"
import AppDataSource from "../data-source"
import { Category } from "../entitites/category.entity"
import { AppError } from "../errors/appError"
import { ICategoryRequest } from "../interfaces/categories"

const createCategoryService = async (isAdm: boolean, {name}: ICategoryRequest) => {

    const categoryRepository = AppDataSource.getRepository(Category)

    const categories = categoryRepository.find()

    const categoryAlreadyExists = (await categories).find(category => category.name === name)

    if(!isAdm){
        throw new AppError("User must be adm to access this route", 403)
    }

    if(categoryAlreadyExists){
        throw new AppError("Category already exists", 400)
    }

    const newCategory = {
        name: name,
        id: uuid4()
    }

    categoryRepository.create(newCategory)

    await categoryRepository.save(newCategory)

    return newCategory
}

export default createCategoryService