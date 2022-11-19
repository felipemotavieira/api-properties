import { v4 as uuid4 } from "uuid"
import { hash } from 'bcrypt'
import AppDataSource from "../data-source"
import { IUser, IUserRequest } from "../interfaces/users"
import { User } from "../entitites/user.entity"
import { AppError } from "../errors/appError"

const createUserService = async ({name, email, password, isAdm}: IUserRequest) => {

    const userRepository = AppDataSource.getRepository(User)

    const users = await userRepository.find()

    const emailAlreadyExists = users.find(user => user.email ===email)

    if(emailAlreadyExists){
        throw new AppError("Email already exists", 400)
    }

    const newUser: IUser = userRepository.create({
        name: name,
        email: email,
        isAdm: Boolean(isAdm),
        isActive: true,
        password: await hash(password, 10),
        createdAt: new Date(),
        updatedAt: new Date()
    })

    // userRepository.create(newUser)

    await userRepository.save(newUser)

    return newUser
}

export default createUserService