import config from "config";
import express, { Request, Response } from "express";
import categoryRouter from "./category/category-router";
import { globalErrorHandler } from "./common/middlewares/globalErrorHandler";

const app = express();
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
    res.json({ message: config.get("server.port") });
});

app.use("/categories", categoryRouter);

app.use(globalErrorHandler);

export default app;
