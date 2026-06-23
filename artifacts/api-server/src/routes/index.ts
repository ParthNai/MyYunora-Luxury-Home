import { Router, type IRouter } from "express";
import healthRouter from "./health";
import productsRouter from "./products";
import categoriesRouter from "./categories";
import ordersRouter from "./orders";
import warrantyRouter from "./warranty";
import newsletterRouter from "./newsletter";
import adminRouter from "./admin";

const router: IRouter = Router();

router.use(healthRouter);
router.use(productsRouter);
router.use(categoriesRouter);
router.use(ordersRouter);
router.use(warrantyRouter);
router.use(newsletterRouter);
router.use(adminRouter);

export default router;
