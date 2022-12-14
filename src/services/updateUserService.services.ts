import { hash } from "bcrypt"
import AppDataSource from "../data-source"
import { User } from "../entitites/user.entity"
import { AppError } from "../errors/appError"

const updateUserService = async (isAdm : boolean, id : string, user: any) => {
    const userRepository = AppDataSource.getRepository(User)
    const findUser = await userRepository.findOneBy({id})
    const {name, email, password} = user

    const verifyBlockedFields = Object.keys(user).some(e => e === 'isAdm' || e === 'id' || e === 'isActive')

    if(verifyBlockedFields){
        throw new AppError("Unauthorized", 401)
    }

    if(!isAdm){
        throw new AppError("User must be adm to access this route", 401)
    }

    if(!findUser){
        throw new AppError("User not found", 404)
    }

    await userRepository.update(
        id,
        {
            name: name ? name : findUser.name,
            email: email ? email : findUser.email,
            password: password ? await hash(password, 10) : findUser.password
        }
    )

    const updatedUser = await userRepository.findOneBy({
        id
    })

    return updatedUser!
}

export default updateUserService