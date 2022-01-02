const { Router } = require("express");
const legalaidRouter = Router();

const { asyncWrapper } = require("../helpers/asyncWrapper");
const {
  createLegalaiditem,
  getLegalaiditems,
  getLegalaiditemById,
  updateLegalaiditem,
  deleteLegalaiditemById,
} = require("./legalaidController");

legalaidRouter.post("/", asyncWrapper(createLegalaiditem));

legalaidRouter.get("/", asyncWrapper(getLegalaiditems));

legalaidRouter.get("/:id", asyncWrapper(getLegalaiditemById));

legalaidRouter.put("/:id", asyncWrapper(updateLegalaiditem));

legalaidRouter.delete("/:id", asyncWrapper(deleteLegalaiditemById));

module.exports = legalaidRouter;
