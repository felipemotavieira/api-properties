import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import { User } from "../entitites/user.entity";
import updateUserService from "../services/updateUserService.services";

const updateUserController = async (req: Request, res: Response) => {
    const isAdm = req.user.isAdm
    const  id  = req.params.id
    const user = req.body

    const updatedUser = await updateUserService(isAdm, id, user)

    if(updatedUser instanceof User){
        return res.status(200).json(instanceToPlain(updatedUser))
    }
}

export default updateUserController