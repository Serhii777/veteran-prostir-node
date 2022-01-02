const useradminModel = require("./useradminModel");
const {
  prepareUseradminResponse,
} = require("../helpers/prepareUseradminResponse");

const { NotFoundError } = require("../errors/errors");

const getUseradmins = async (req, res, next) => {
  // console.log("getUsersAdmin1111111");

  const useradmins = await useradminModel.find();

  return res.status(200).json(prepareUseradminResponse(useradmins));
};

const getCurrentUseradmin = async (req, res) => {
  const [useradminForResponse] = await prepareUseradminResponse([
    req.useradmin,
  ]);

  return res.status(201).send(useradminForResponse);
};

const getUseradminById = async (req, res) => {
// console.log("req.paramsGetUseradminById:", req.params);

  const useradminId = req.params.id;

  const useradmin = await useradminModel.findById(useradminId);

  if (!useradmin) {
    return res
      .status(404)
      .json({ message: `No user with id ${useradmin} found!` });
  }
  const [useradminForResponse] = prepareUseradminResponse([useradmin]);

  res.status(200).json(useradminForResponse);
};

const updateUseradmin = async (req, res) => {
  const useradminId = req.params.id;

  const useradminToUpdate = await useradminModel.findUserByIdAndUpdate(
    useradminId,
    req.body
  );

  if (!useradminToUpdate) {
    throw new NotFoundError("User not authorized");
  }

  return res.status(200).send({ message: `User ${useradminToUpdate} updated` });
};

const deleteUseradminById = async (req, res) => {
  const useradminId = req.params.id;

  const deleteUseradmin = await useradminModel.findByIdAndDelete(useradminId);

  if (!deleteUseradmin) {
    throw new NotFoundError("User not found");
  }

  // const filePath = `../public/images/${deleteUseradmin._id}.svg`; //* (.jpg .png)
  // const avatarDel = path.join(__dirname, filePath);
  // await fsPromises.unlink(avatarDel);

  return res
    .status(200)
    .send({ message: `User ${deleteUseradmin.email} deleted` });
};

module.exports = {
  getUseradmins,
  getCurrentUseradmin,
  getUseradminById,
  updateUseradmin,
  deleteUseradminById,
};
