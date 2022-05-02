import express from "express";
import * as productController from "../controllers/products.controller";

const router = express.Router();

/**
 * Matches a GET request to /api/products/:ProductID
 * Return the record from the bestbuy.products table that matches the ProductID
 */
router.get("/:ProductID", async (req, res, next) => {
  try {
    let { ProductID } = req.params;
    let [results] = await productController.findOne(ProductID);
    res.json(results);
  } catch (e) {
    next(e);
  }
});

export default router;
