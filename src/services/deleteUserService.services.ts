import AppDataSource from "../data-source"
import { User } from "../entitites/user.entity"
import { AppError } from "../errors/appError"

const deleteUserService = async (isAdm : boolean, id : string): Promise<User | Array<number | string>> => {

    const userRepository = AppDataSource.getRepository(User)

    const findUser = await userRepository.findOneBy({id})
    
    if(!isAdm){
        throw new AppError("User must be adm to access this route", 403)
    }

    if(!findUser){
        throw new AppError("User not found", 404)
    }    
    
    if(!findUser.isActive){
        throw new AppError("User already deleted", 400)
    }

    await userRepository.update(
        id,
        {
            isActive: false
        }
    )

    const user = await userRepository.findOneBy({id})

    return user!
}

export default deleteUserService