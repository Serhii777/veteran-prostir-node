const { Router } = require("express");
const resultworkRouter = Router();

const { asyncWrapper } = require("../helpers/asyncWrapper");
const {
  createResultworkitem,
  getResultworkitems,
  getResultworkPaginitems,
  deleteResultworkitemById,
} = require("./resultworkController");

resultworkRouter.post("/", asyncWrapper(createResultworkitem));
resultworkRouter.get("/", asyncWrapper(getResultworkitems));
resultworkRouter.get("/params", asyncWrapper(getResultworkPaginitems));
resultworkRouter.delete("/:id", asyncWrapper(deleteResultworkitemById));

module.exports = resultworkRouter;
