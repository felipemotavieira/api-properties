import { Request, Response } from "express";
import { User } from "../entitites/user.entity";
import deleteUserService from "../services/deleteUserService.services";

const deleteUserController = async (req: Request, res: Response)=> {
        const isAdm = req.user.isAdm
        const  id  = req.params.id

        const deletedUser = await deleteUserService(isAdm, id)

        if(deletedUser instanceof User){
            return res.status(204).json(deletedUser)
        }

        // return res.status(deletedUser[0] as number).json({
        //     message: deletedUser[1]
        // })
}

export default deleteUserController