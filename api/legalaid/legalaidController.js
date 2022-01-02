const legalaiditemsModel = require("./legalaidModel");

const createLegalaiditem = async (req, res, next) => {
  const legalaiditem = await legalaiditemsModel.create(req.body);

  return res.status(201).send({ message: `legalaiditem ${legalaiditem} created` });
};

const getLegalaiditems = async (req, res, next) => {
  const legalaiditems = await legalaiditemsModel.find();

  return res.status(200).json(legalaiditems);
};


const deleteLegalaiditemById = async (req, res) => {
    const legalaiditemId = req.params.id;
    const deleteLegalaiditem = await legalaiditemsModel.findByIdAndDelete(legalaiditemId);
    if (!deleteLegalaiditem) {
      throw new NotFoundError("Legalaiditem not found");
    }
    return res
      .status(200)
      .send({ message: `Legalaiditem ${legalaiditemId._id} deleted!` });
};

module.exports = {
  createLegalaiditem,
  getLegalaiditems,
  deleteLegalaiditemById,
};
