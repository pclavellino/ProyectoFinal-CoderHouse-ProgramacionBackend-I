import { Router } from "express";
import productsRoutes from "./products.router.js";
import cartsRoutes from "./carts.router.js";

const router = Router();

router.use("/products", productsRoutes);
router.use("/carts", cartsRoutes);

export default router;