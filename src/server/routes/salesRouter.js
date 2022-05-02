import express from "express";
import * as salesController from "../controllers/sales.controller";

const router = express.Router();

/**
 * Matches a GET request to /api/sales
 * Returns records from the bestbuy.sales table
 * Defaults to LIMIT=10
 */
router.get("/", async (req, res, next) => {
  try {
    let { limit, page } = req.query;
    let results = await salesController.find(limit, page);
    res.json(results);
  } catch (e) {
    next(e);
  }
});

export default router;
