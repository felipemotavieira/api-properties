import AppDataSource from "../data-source"
import { User } from "../entitites/user.entity"
import { AppError } from "../errors/appError"
import { IUser } from "../interfaces/users"

const listUsersService = async (isAdm : boolean): Promise<IUser[]> => {
    
    if(!isAdm){
        throw new AppError("User must be adm to access thies route", 403)
    }

    const userRepository = AppDataSource.getRepository(User)

    const users = userRepository.find()

    return users

    // let returnableUsers : IUserReturnable[] = [];
    
    // (await users).forEach((user: IUser) : void => {
    //     const {id, name, email, isAdm, isActive, createdAt, updatedAt} = user

    //     const returnableUser: IUserReturnable = {
    //         id, name, email, isAdm, isActive, createdAt, updatedAt
    //     }

    //     returnableUsers.push(returnableUser)
    // })

    // return returnableUsers
}

export default listUsersService