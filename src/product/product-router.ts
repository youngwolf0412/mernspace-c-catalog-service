import express from "express";

import authenticate from "../common/middlewares/authenticate";
import { canAccess } from "../common/middlewares/canAccess";
import { ROLES } from "../common/constants";
import { ProductController } from "./product-controller";
import createProductValidator from "./create-product-validator";
import { ProductService } from "./product-service";
import fileUpload from "express-fileupload";
import { S3Storage } from "../common/services/S3Storage";
import createHttpError from "http-errors";
import updateProductValidator from "./update-product-validator";
// import { createMessageProducerBroker } from "../common/factories/brokerFactory";

const router = express.Router();

const productService = new ProductService();
const s3Storage = new S3Storage();
// console.log(s3Storage);

// const broker = createMessageProducerBroker();

const productController = new ProductController(productService, s3Storage);
//     productService,
//     s3Storage,
//     broker,

router.post(
    "/",
    authenticate,
    canAccess([ROLES.ADMIN, ROLES.MANAGER]),
    fileUpload({
        limits: { fileSize: 500 * 1024 }, // 500kb
        abortOnLimit: true,
        limitHandler: (req, res, next) => {
            const error = createHttpError(400, "File size exceeds the limit");
            next(error);
        },
    }),
    createProductValidator,
    productController.create,
);

router.put(
    "/:productId",
    authenticate,
    canAccess([ROLES.ADMIN, ROLES.MANAGER]),

    fileUpload({
        limits: { fileSize: 500 * 1024 }, // 500kb
        abortOnLimit: true,
        limitHandler: (req, res, next) => {
            const error = createHttpError(400, "File size exceeds the limit");
            next(error);
        },
    }),
    updateProductValidator,
    productController.update,
);

router.get("/", productController.index);

export default router;
