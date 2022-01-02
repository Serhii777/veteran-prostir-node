const { Router } = require("express");
const socioadviceRouter = Router();

const { asyncWrapper } = require("../helpers/asyncWrapper");
const {
  createSocioadvice,
  getSocioadvices,
  getSocioadviceById,
  updateSocioadvice,
  deleteSocioadviceById,
} = require("./socioadviceController");

socioadviceRouter.post(
  "/",
  asyncWrapper(createSocioadvice)
);

socioadviceRouter.get("/", asyncWrapper(getSocioadvices));

socioadviceRouter.get("/:id", asyncWrapper(getSocioadviceById));

socioadviceRouter.put(
  "/:id",
  asyncWrapper(updateSocioadvice)
);

socioadviceRouter.delete("/:id", asyncWrapper(deleteSocioadviceById));

module.exports = socioadviceRouter;
