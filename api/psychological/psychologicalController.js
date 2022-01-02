const psychologicalitemsModel = require("./psychologicalModel");

const createPsychologicalitem = async (req, res, next) => {
  const psychologicalitem = await psychologicalitemsModel.create(req.body);

  return res.status(201).send({ message: "psychologicalitem created" });
};

const getPsychologicalitems = async (req, res, next) => {
  const psychologicalitems = await psychologicalitemsModel.find();

  return res.status(200).json(psychologicalitems);
};


const deletePsychologicalitemById = async (req, res) => {
  const psychologicalitemId = req.params.id;
  const deletePsychologicalitem =
    await psychologicalitemsModel.findByIdAndDelete(psychologicalitemId);
  if (!deletePsychologicalitem) {
    throw new NotFoundError("Psychologicalitem not found");
  }
  return res
    .status(200)
    .send({ message: `Psychologicalitem ${psychologicalitemId._id} deleted!` });
};

module.exports = {
  createPsychologicalitem,
  getPsychologicalitems,
  deletePsychologicalitemById,
};
