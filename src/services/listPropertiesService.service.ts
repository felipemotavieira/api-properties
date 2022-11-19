import AppDataSource from "../data-source"
import { Property } from "../entitites/property.entity"

const listPropertyService = async () => {

    const propertyRepository = AppDataSource.getRepository(Property)

    const categories = propertyRepository.find()

    return categories
}

export default listPropertyService