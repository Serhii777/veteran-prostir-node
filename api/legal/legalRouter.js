const { Router } = require("express");
const legalRouter = Router();

const { asyncWrapper } = require("../helpers/asyncWrapper");
const {
  createLegalitem,
  getLegalitems,
  deleteLegalitemById,
} = require("./legalController");

legalRouter.post("/", asyncWrapper(createLegalitem));

legalRouter.get("/", asyncWrapper(getLegalitems));

legalRouter.delete("/:id", asyncWrapper(deleteLegalitemById));

module.exports = legalRouter;
