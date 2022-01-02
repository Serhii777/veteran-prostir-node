const { Router } = require("express");
const attentionRouter = Router();

const { asyncWrapper } = require("../helpers/asyncWrapper");
const {
  createAttentionitem,
  getAttentionitems,
  deleteAttentionitemById,
} = require("./attentionController");

attentionRouter.post("/", asyncWrapper(createAttentionitem));

attentionRouter.get("/", asyncWrapper(getAttentionitems));

attentionRouter.delete("/:id", asyncWrapper(deleteAttentionitemById));

module.exports = attentionRouter;
