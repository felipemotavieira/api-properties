import { IUserLogin } from "../interfaces/users"
import AppDataSource from "../data-source";
import { User } from "..//entitites/user.entity";
import { compare } from "bcrypt";
import jwt from "jsonwebtoken";
import { AppError } from "../errors/appError";

const createSessionService = async ({email, password}: IUserLogin): Promise<string> => {

    const userRepository = AppDataSource.getRepository(User)

    const user = await userRepository.findOneBy({
        email:email
    })   

    if(!user){
        throw new AppError('Invalid user or password', 403)
    }
    
    const passwordMatch = await compare(password, user.password)
    
    if(!passwordMatch){
        throw new AppError('Invalid user or password', 403)
    }

    const token = jwt.sign({
        isAdm: user.isAdm,
    },
    process.env.SECRET_KEY as string,
    {
        expiresIn: '24h',
        subject: user.id
    })
    
    return token
}

export default createSessionService