const path = require("path");
const fs = require("fs");
const baseUrl = "http://localhost:4001/files/";

const {
  uploadFileMiddleware,
  uploadFilesMiddleware,
} = require("../helpers/upload");

const uploadController = async (req, res) => {
  try {
    await uploadFileMiddleware(req, res);

    if (req.file === undefined) {
      return res.status(400).send({
        message:
          "Please upload a file! File format should be PNG, JPG, JPEG or SVG!",
      });
    }

    res.status(200).send({
      message: "Uploaded the file successfully: " + req.file.originalname,
    });
  } catch (error) {
    if (error.code === "LIMIT_FILE_SIZE") {
      return res.status(500).send({
        message: "File size cannot be larger than 3MB!",
      });
    }

    res.status(500).send({
      message: `Could not upload the file: ${req.file.originalname}. ${error}`,
    });
  }
};

const uploadControllerFiles = async (req, res) => {
  try {
    await uploadFilesMiddleware(req, res);

    if (req.files.length <= 0) {
      return res.send(`You must select at least 1 file.`);
    }

    return res.send(`Files have been uploaded.`);
  } catch (error) {
    console.log(error);

    if (error.code === "LIMIT_UNEXPECTED_FILE") {
      return res.send("Too many files to upload.");
    }
    return res.send(`Error when trying upload many files: ${error}`);
  }
};

const getListFiles = (req, res) => {
  // console.log("__basedir:", __basedir);
  // console.log("__dirname:", __dirname);
  const directoryPath = path.resolve("./public/files/");

  fs.readdir(directoryPath, function (error, files) {
    let fileInfos = [];

    if (error) {
      return res.status(500).send({
        message: "Unable to scan files!",
      });
    } else {
      files.forEach((file) => {
        console.log("file:", file.size);
        fileInfos.push({
          name: file,
          url: baseUrl + file,
        });
      });
    }

    return res.status(200).send(fileInfos);
  });
};

const download = (req, res) => {
  const fileName = req.params.name;
  const directoryPath = path.resolve("./public/files");

  res.download(directoryPath + "/" + fileName, fileName, (error) => {
    if (error) {
      res.status(500).send({
        message: "Could not download the file. " + error,
      });
    }
  });
};

module.exports = {
  uploadController,
  uploadControllerFiles,
  getListFiles,
  download,
};
