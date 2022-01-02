const { Router } = require("express");
const rehabilitationRouter = Router();

const { asyncWrapper } = require("../helpers/asyncWrapper");
const {
  createRehabilitation,
  getRehabilitations,
  getRehabilitationById,
  updateRehabilitation,
  deleteRehabilitationById,
} = require("./rehabilitationController");

rehabilitationRouter.post("/", asyncWrapper(createRehabilitation));

rehabilitationRouter.get("/", asyncWrapper(getRehabilitations));

rehabilitationRouter.get("/:id", asyncWrapper(getRehabilitationById));

rehabilitationRouter.put("/:id", asyncWrapper(updateRehabilitation));

rehabilitationRouter.delete("/:id", asyncWrapper(deleteRehabilitationById));

module.exports = rehabilitationRouter;
