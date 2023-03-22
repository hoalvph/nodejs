import express from "express"
import { create, get, getAll, remove, update } from "../controllers/product.js"
const router = express.Router();

router.get("/product", getAll);
router.get("/product/:id", get);
router.post("/product/add", create);
router.patch("/product/:id", update);
router.delete("/product/:id", remove);

export default router;