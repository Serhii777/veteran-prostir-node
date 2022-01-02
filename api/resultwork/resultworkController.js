const resultworkitemsModel = require("./resultworkModel");

const getPagination = (page, size) => {
  const limit = size ? +size : 1000;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

const createResultworkitem = async (req, res, next) => {
  const resultworkitem = await resultworkitemsModel.create(req.body);

  console.log("resultworkitem:", resultworkitem);

  return res.status(201).send({ message: "resultworkitem created" });
};

//? Запрос: GET  /api/notes?limit=10&skip=0&sort=ASC
//* .skip(2) - скільки пропустити фільмів (перші 2 фільми)(в ФЕ это типа Pages) (skip = pageNumber * limit)
//* .limit(3) - скільки показати фільмів (всього 3 фільми)(в ФЕ это типа perPages)
//* .count() - рахує скільки фільмів вього є в БД
//* const films = await filmModel.find().sort({ name: 1 }).skip(2).limit(3);

const getResultworkitems = async (req, res, next) => {
  const limit = req.query.size ? parseInt(req.query.size) : 3;
  const skip = req.query.page ? parseInt(req.query.page) : 0;
  // const sortOrder = req.query.sort == "ASC" ? 1 : -1;

  const lengthWorkitems = await (await resultworkitemsModel.find()).length;

  const resultworkitems = await resultworkitemsModel
    .find()
    .sort({ date: -1 })
    .skip(skip <= lengthWorkitems ? skip : lengthWorkitems)
    .limit(limit);

  let allResultWorkitems = { resultworkitems, lengthWorkitems };

  return res.status(200).json(allResultWorkitems);
};

const getResultworkPaginitems = async (req, res, next) => {
  const { page, size, title } = req.query;
  let condition = title
    ? { title: { $regex: new RegExp(title), $options: "i" } }
    : {};

  const { limit, offset } = getPagination(page, size);

  const resultworkPaginitems = await resultworkitemsModel
    .paginate(condition, { offset, limit })
    .then((data) => {
      res.send({
        totalItems: data.totalDocs,
        resultWorks: data.docs,
        totalPages: data.totalPages,
        currentPage: data.page - 1,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    });

  return res.status(200).json(resultworkPaginitems);
};

const deleteResultworkitemById = async (req, res) => {
  const resultworkitemId = req.params.id;
  const deleteResultworkitem = await resultworkitemsModel.findByIdAndDelete(
    resultworkitemId
  );
  if (!deleteResultworkitem) {
    throw new NotFoundError("Resultworkitem not found");
  }
  return res
    .status(200)
    .send({ message: `Resultworkitem ${resultworkitemId._id} deleted!` });
};

module.exports = {
  createResultworkitem,
  getResultworkitems,
  getResultworkPaginitems,
  deleteResultworkitemById,
};
