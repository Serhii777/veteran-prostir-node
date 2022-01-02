const createworkshopModel = require("./createworkshopModel");

const createcreateworkshop = async (req, res, next) => {
  const createworkshop = await createworkshopModel.create(req.body);

  return res.status(201).send({ message: `Createworkshop ${createworkshop} created` });
};

const getcreateworkshops = async (req, res, next) => {
  const createworkshops = await createworkshopModel.find();

  return res.status(200).json(createworkshops);
};


const deletecreateworkshopById = async (req, res) => {
    const createworkshopId = req.params.id;
    const deleteCreateworkshop = await createworkshopModel.findByIdAndDelete(createworkshopId);
    if (!deleteCreateworkshop) {
      throw new NotFoundError("Createworkshop not found");
    }
    return res
      .status(200)
      .send({ message: `Createworkshop ${createworkshopId._id} deleted!`});
};

module.exports = {
  createcreateworkshop,
  getcreateworkshops,
  deletecreateworkshopById,
};
