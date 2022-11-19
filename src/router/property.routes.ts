import { Router } from "express";
import createPropertyController from "../controllers/createPropertyController.controller";
import listPropertyController from "../controllers/listPropertiesController.controller";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";

const router = Router()

router.post("", ensureAuthMiddleware, createPropertyController)
router.get("", listPropertyController)

export default router