const { Router } = require("express");
const psychologicalRouter = Router();

const { asyncWrapper } = require("../helpers/asyncWrapper");
const {
  createPsychologicalitem,
  getPsychologicalitems,
  getPsychologicalitemById,
  updatePsychologicalitem,
  deletePsychologicalitemById,
} = require("./psychologicalController");

psychologicalRouter.post("/", asyncWrapper(createPsychologicalitem));

psychologicalRouter.get("/", asyncWrapper(getPsychologicalitems));

psychologicalRouter.get("/:id", asyncWrapper(getPsychologicalitemById));

psychologicalRouter.put("/:id", asyncWrapper(updatePsychologicalitem));

psychologicalRouter.delete("/:id", asyncWrapper(deletePsychologicalitemById));

module.exports = psychologicalRouter;
