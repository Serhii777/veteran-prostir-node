const womenclubModel = require("./womenclubModel");

const createWomenclub = async (req, res, next) => {
  const womenclub = await womenclubModel.create(req.body);

  return res.status(201).send({ message: `Womenclub ${womenclub} created` });
};

const getWomenclubs = async (req, res, next) => {
  const womenclubs = await womenclubModel.find();

  return res.status(200).json(womenclubs);
};

const deleteWomenclubById = async (req, res) => {
  const womenclubId = req.params.id;
  const deletewomenclub = await womenclubModel.findByIdAndDelete(womenclubId);
  if (!deletewomenclub) {
    throw new NotFoundError("womenclub not found");
  }
  return res
    .status(200)
    .send({ message: `Womenclub ${womenclubId._id} deleted!` });
};

module.exports = {
  createWomenclub,
  getWomenclubs,
  deleteWomenclubById,
};
