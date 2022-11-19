import { Request, Response } from 'express'
import { IUserLogin } from '../interfaces/users'
import userLoginService from '../services/createSessionService.services'

const createSessionController = async (req: Request, res: Response) => {
    const data: IUserLogin = req.body
    const token =  await userLoginService(data)
    
    return res.status(200).json({token})
}

export default createSessionController