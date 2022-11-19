import { Router } from "express";
import createSchedulesController from "../controllers/createSchedulesController.controller";
import listSchedulesByPropertyController from "../controllers/listSchedulesByPropertyController.controller";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";

const router = Router()

router.post("", ensureAuthMiddleware, createSchedulesController)
router.get("/properties/:id", ensureAuthMiddleware, listSchedulesByPropertyController)

export default router