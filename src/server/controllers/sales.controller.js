import query from "../db/utils";

export const resultsCount = async () => {
  return await query("SELECT COUNT(*) as total FROM sales");
};

export const find = async (limit = 10, page = 1) => {
  let limitParam = parseInt(limit);
  let offsetParam = parseInt(page * limit - limit);

  if (limitParam !== 50 && limitParam !== 25) {
    limitParam = 10;
  }

  let [{ total }] = await resultsCount();

  // Offset needs to be a multiple of the limit
  if (offsetParam % limitParam !== 0) {
    offsetParam -= offsetParam % limitParam;
  }

  let results = await query(
    "SELECT s.SalesID, s.ProductID, p.Name, p.Price, s.Quantity FROM sales as s INNER JOIN products as p ON p.ProductID = s.ProductID LIMIT ? OFFSET ?",
    [limitParam, offsetParam]
  );

  return {
    results,
    count: results.length,
    total,
  };
};
