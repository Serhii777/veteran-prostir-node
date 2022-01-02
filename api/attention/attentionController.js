const AttentionitemModel = require("./attentionModel");

const createAttentionitem = async (req, res, next) => {
  const attentionitem = await AttentionitemModel.create(req.body);

  console.log("attentionitem:", attentionitem);

  return res.status(201).send({ message: "Attentionitem created!" });
};

const getAttentionitems = async (req, res, next) => {
  const attentionitems = await AttentionitemModel.find();

  return res.status(200).json(attentionitems);
};

const deleteAttentionitemById = async (req, res) => {
  const attentionitem = req.params.id;
  const deleteAttentionitem = await AttentionitemModel.findByIdAndDelete(
    attentionitem
  );
  if (!deleteAttentionitem) {
    throw new NotFoundError("Attentionitem not found");
  }
  return res
    .status(200)
    .send({ message: `Attentionitem ${deleteAttentionitem._id} was deleted!` });
};

module.exports = {
  createAttentionitem,
  getAttentionitems,
  deleteAttentionitemById,
};
