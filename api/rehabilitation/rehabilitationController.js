const rehabilitationModel = require("./rehabilitationModel");

const createRehabilitation = async (req, res, next) => {
  const rehabilitation = await rehabilitationModel.create(req.body);

  return res
    .status(201)
    .send({ message: `rehabilitation ${rehabilitation} created` });
};

const getRehabilitations = async (req, res, next) => {
  const legalaiditems = await rehabilitationModel.find();

  return res.status(200).json(legalaiditems);
};

const deleteRehabilitationById = async (req, res) => {
  const rehabilitationId = req.params.id;
  const deleteRehabilitation = await rehabilitationModel.findByIdAndDelete(
    rehabilitationId
  );
  if (!deleteRehabilitation) {
    throw new NotFoundError("Rehabilitation not found");
  }
  return res
    .status(200)
    .send({ message: `Rehabilitation ${rehabilitationId._id} deleted!` });
};

module.exports = {
  createRehabilitation,
  getRehabilitations,
  deleteRehabilitationById,
};
