const socioadvicesModel = require("./socioadviceModel");

const createSocioadvice = async (req, res, next) => {
  const socioadvices = await socioadvicesModel.create(req.body);

  return res
    .status(201)
    .send({ message: `socioadvices ${socioadvices} created` });
};

const getSocioadvices = async (req, res, next) => {
  const socioadvices = await socioadvicesModel.find();

  return res.status(200).json(socioadvices);
};

const deleteSocioadviceById = async (req, res) => {
  const socioadviceId = req.params.id;
  const deleteSocioadvice = await socioadvicesModel.findByIdAndDelete(
    socioadviceId
  );
  if (!deleteSocioadvice) {
    throw new NotFoundError("Socioadvice not found");
  }
  return res
    .status(200)
    .send({ message: `Socioadvice ${SocioadviceId._id} deleted!` });
};

module.exports = {
  createSocioadvice,
  getSocioadvices,
  deleteSocioadviceById,
};
