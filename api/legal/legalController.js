const LegalitemModel = require("./legalModel");

const createLegalitem = async (req, res, next) => {
    
  const legalitem = await LegalitemModel.create(req.body);

  console.log("legalitem:", legalitem);

  return res.status(201).send({ message: "Attentionitem created!" });
};

const getLegalitems = async (req, res, next) => {

  const legalitems = await LegalitemModel.find();

  return res.status(200).json(legalitems);
};

const deleteLegalitemById = async (req, res) => {
  const legalitem = req.params.id;
  const deleteLegalitem = await LegalitemModel.findByIdAndDelete(legalitem);
  if (!deleteLegalitem) {
    throw new NotFoundError("Legalitem not found");
  }
  return res
    .status(200)
    .send({ message: `Legalitem ${deleteLegalitem._id} was deleted!` });
};

module.exports = {
  createLegalitem,
  getLegalitems,
  deleteLegalitemById,
};
