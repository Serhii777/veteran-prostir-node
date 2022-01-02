const { Router } = require("express");
const womenclubRouter = Router();

const { asyncWrapper } = require("../helpers/asyncWrapper");
const {
  createWomenclub,
  getWomenclubs,
  getWomenclubById,
  updateWomenclub,
  deleteWomenclubById,
} = require("./womenclubController");

womenclubRouter.post("/", asyncWrapper(createWomenclub));

womenclubRouter.get("/", asyncWrapper(getWomenclubs));

womenclubRouter.get("/:id", asyncWrapper(getWomenclubById));

womenclubRouter.put("/:id", asyncWrapper(updateWomenclub));

womenclubRouter.delete("/:id", asyncWrapper(deleteWomenclubById));

module.exports = womenclubRouter;
