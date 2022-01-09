const uploadImagesModel = require("./uploadImagesModel");
const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");

const getImages = async (req, res) => {
  try {
    const images = await uploadImagesModel.find();

    // console.log("photos:", images);

    return res.status(200).json({ images, msg: "image info fetched" });
  } catch (error) {
    console.log("error:", error);
    return res.status(500).json({ error: "some error occured" });
  }
};

const uploadImage = async (req, res) => {
  const { file } = req;
  const { body } = req;

  // console.log("file.size:", file.size);
  // console.log("req.{body}:", req.body);

  if (file === null) {
    return res.status(400).json({ msg: "No file uploaded" });
  }

  // Фільтр Для вибору доступного формату картинки
  try {
    // console.log("req.{file.mimetype}:", file.mimetype);

    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg"
    ) {
      if (file && file.path) {
        const image = await uploadImagesModel.create({
          titleImage: body.titleImage,
          descriptionImage: body.descriptionImage,
          imageFilename: file.filename,
          imagePath: file.path,
          imageUrl: file.photoURL,
          imageInitialSize: `${file.size} bytes`,
        });

        console.log("image111:", image);

        return res.status(201).json({ image, msg: "image successfully saved" });
      } else {
        return res.status(422).json({ error: "invalid" });
      }
    } else {
      return res
        .status(400)
        .json({ msg: "File format should be PNG, JPG or JPEG!" });
    }
  } catch (error) {
    console.log("error:", error);
    return res.status(500).json({ error: "Произошла некоторая ошибка" });
  }
};

const deleteImageById = async (req, res) => {
  const imageitemId = req.params.id;

  const deleteImageitem = await uploadImagesModel.findByIdAndDelete(
    imageitemId
  );

  if (!deleteImageitem) {
    throw new NotFoundError("Imageitem not found");
  }

  const imageUrlDelete = deleteImageitem.imageUrl;
  const jsonPath = path.join(__dirname, "..", `../${imageUrlDelete}`);

  fs.stat(jsonPath, (err, stats) => {
    // console.log("stats: ", stats);

    if (err) {
      return console.log("err: ", err);
    }

    fsPromises.unlink(jsonPath, (err) => {
      if (err) throw err;
      console.log("File successfully deleted");
    });
  });

  return res
    .status(200)
    .send({ message: `Imageitem ${deleteImageitem._id} deleted!` });
};

module.exports = {
  getImages,
  uploadImage,
  // uploadImages,
  deleteImageById,
};
