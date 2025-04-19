import express from "express";
import { CategoryController } from "./category-controller";
import categoryValidator from "./category-validator";
import categoryUpdateValidator from "./category-update-validator";
import { CategoryService } from "./category-service";
import logger from "../config/logger";

// import { asyncWrapper } from "../common/utils/wrapper";
import authenticate from "../common/middlewares/authenticate";
import { canAccess } from "../common/middlewares/canAccess";
import { ROLES } from "../common/constants";

const router = express.Router();

const categoryService = new CategoryService();
const categoryController = new CategoryController(categoryService, logger);

router.post(
    "/",
    authenticate,
    canAccess([ROLES.ADMIN]),
    categoryValidator,
    categoryController.create,
);

router.patch(
    "/:id",
    authenticate,
    canAccess([ROLES.ADMIN]),
    categoryUpdateValidator,
    categoryController.update,
);

router.get("/", categoryController.index);
router.get("/:categoryId", categoryController.getOne);

export default router;
