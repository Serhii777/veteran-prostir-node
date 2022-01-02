const newitemModel = require("./newModel");

const createNew = async (req, res, next) => {
  const newitem = await newitemModel.create(req.body);

  return res.status(201).send({ message: `New ${newitem} created` });
};

const getNews = async (req, res, next) => {
  const newitems = await newitemModel.find().sort({ date: -1 });

  // console.log("newitems: ", newitems);

  return res.status(200).json(newitems);
};

const deleteNewById = async (req, res) => {
  const newitemId = req.params.id;
  const deleteNewitem = await newitemModel.findByIdAndDelete(newitemId);
  if (!deleteNewitem) {
    throw new NotFoundError("Newitem not found");
  }
  return res.status(200).send({ message: `Newitem ${newitemId._id} deleted!` });
};

module.exports = {
  createNew,
  getNews,
  deleteNewById,
};
