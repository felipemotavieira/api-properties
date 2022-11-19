import { Router } from "express";
import createCategoryController from "../controllers/createCategoryController.controller";
import listCategoryController from "../controllers/listCategoryController.controller";
import listPropertyByCategoryController from "../controllers/listPropertyByCategoryController.controller";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";

const router = Router()

router.post("", ensureAuthMiddleware, createCategoryController)
router.get("", listCategoryController)
router.get("/:id/properties", listPropertyByCategoryController)

export default router