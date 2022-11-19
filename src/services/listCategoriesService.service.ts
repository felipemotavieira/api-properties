import AppDataSource from "../data-source"
import { Category } from "../entitites/category.entity"

const listCategoryService = async () => {

    const categoryRepository = AppDataSource.getRepository(Category)

    const categories = categoryRepository.find()

    return categories
}

export default listCategoryService