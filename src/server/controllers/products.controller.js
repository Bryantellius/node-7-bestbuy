import query from "../db/utils";

export const findOne = async (ProductID) => {
  let ProductIDParam = parseInt(ProductID);

  if (isNaN(ProductIDParam)) {
    return {
      msg: "Invalid ProductID",
    };
  }

  return await query("SELECT * FROM products WHERE ProductID = ?", [ProductID]);
};
