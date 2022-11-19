import AppDataSource from "../data-source"
import { Category } from "../entitites/category.entity"
import { AppError } from "../errors/appError"

const listPropertyByCategoryService = async (categoryId: string) => {
    const categoryRepository = AppDataSource.getRepository(Category)
    
    const validCategoryId = await categoryRepository.findOne({
        where:{
            id: categoryId
        }
    })

    if(!validCategoryId){
        throw new AppError("Category not found", 404)
    }
    
    return validCategoryId
}

export default listPropertyByCategoryService