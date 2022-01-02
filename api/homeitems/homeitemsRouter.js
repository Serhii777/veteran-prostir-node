const { Router } = require("express");
const homeitemsRouter = Router();

const { asyncWrapper } = require("../helpers/asyncWrapper");
const {
  createHomeitem,
  getHomeitems,
  deleteHomeitemById,
} = require("./homeitemsController");

homeitemsRouter.post("/", asyncWrapper(createHomeitem));

homeitemsRouter.get("/", asyncWrapper(getHomeitems));

// homeitemsRouter.get("/:id", asyncWrapper(getHomeitemById));

// homeitemsRouter.put("/:id", asyncWrapper(updateHomeitem));

homeitemsRouter.delete("/:id", asyncWrapper(deleteHomeitemById));

module.exports = homeitemsRouter;
