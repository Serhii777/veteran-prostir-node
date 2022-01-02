const { Router } = require("express");
const newRouter = Router();

const { asyncWrapper } = require("../helpers/asyncWrapper");
const {
  createNew,
  getNews,
  getNewById,
  updateNew,
  deleteNewById,
} = require("./newController");

newRouter.post("/", asyncWrapper(createNew));

newRouter.get("/", asyncWrapper(getNews));

newRouter.get("/:id", asyncWrapper(getNewById));

newRouter.put("/:id", asyncWrapper(updateNew));

newRouter.delete("/:id", asyncWrapper(deleteNewById));

module.exports = newRouter;
