const homeitemsModel = require("./homeitemsModel");

const createHomeitem = async (req, res, next) => {
  const homeitem = await homeitemsModel.create(req.body);


  console.log("homeitem:", homeitem);

  return res.status(201).send({ message: "homeitem created" });
};

const getHomeitems = async (req, res, next) => {
  // console.log("getHomeitems1111111");

  const homeitems = await homeitemsModel.find();

  return res.status(200).json(homeitems);
};


const deleteHomeitemById = async (req, res) => {
    const homeitemId = req.params.id;
    const deleteHomeitem = await homeitemsModel.findByIdAndDelete(homeitemId);
    if (!deleteHomeitem) {
      throw new NotFoundError("Homeitem not found");
    }
    return res
      .status(200)
      .send({ message: `Homeitem ${deleteHomeitem._id} deleted!` });
};

module.exports = {
  createHomeitem,
  getHomeitems,
  // getHomeitemById,
  // updateHomeitem,
  deleteHomeitemById,
};
