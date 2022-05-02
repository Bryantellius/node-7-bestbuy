import express from "express";
import productsRouter from "./productsRouter";
import salesRouter from "./salesRouter";

const router = express.Router();

router.get("/test", (req, res, next) => {
  res.send("Hello World!");
});

router.use("/sales", salesRouter);
router.use("/products", productsRouter);

export default router;
