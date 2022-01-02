const { Router } = require("express");
const createworkshopRouter = Router();

const { asyncWrapper } = require("../helpers/asyncWrapper");
const {
  createcreateworkshop,
  getcreateworkshops,
  getcreateworkshopById,
  updatecreateworkshop,
  deletecreateworkshopById,
} = require("./createworkshopController");

createworkshopRouter.post("/", asyncWrapper(createcreateworkshop));

createworkshopRouter.get("/", asyncWrapper(getcreateworkshops));

createworkshopRouter.get("/:id", asyncWrapper(getcreateworkshopById));

createworkshopRouter.put("/:id", asyncWrapper(updatecreateworkshop));

createworkshopRouter.delete("/:id", asyncWrapper(deletecreateworkshopById));

module.exports = createworkshopRouter;
