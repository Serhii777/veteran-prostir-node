const express = require("express");
// const loger = require("morgan");

const cors = require("cors");
require("dotenv").config();

const authRouter = require("./auth/authRouter");
const useradminRouter = require("./useradmins/useradminRouter");
const attentionRouter = require("./attention/attentionRouter");
const homeitemsRouter = require("./homeitems/homeitemsRouter");
const legalRouter = require("./legal/legalRouter");

const uploadImagesRouter = require("./uploadImages/uploadImagesRouter");

const psychologicalRouter = require("./psychological/psychologicalRouter");
const legalaidRouter = require("./legalaid/legalaidRouter");
const socioadviceRouter = require("./socioadvice/socioadviceRouter");
const rehabilitationRouter = require("./rehabilitation/rehabilitationRouter");
const createworkshopRouter = require("./createworkshop/createworkshopRouter");
const womenclubRouter = require("./womenclub/womenclubRouter");
const announcementRouter = require("./announcement/announcementRouter");
const newRouter = require("./new/newRouter");

const resultworkRouter = require("./resultwork/resultworkRouter");

const initDatabase = require("./helpers/initDatabase");

const app = express();
global.__basedir = __dirname;

console.log('process.env.SITE_DOMAIN_LOCAL:', process.env.SITE_DOMAIN_LOCAL);

const corsOptions = {
  // origin: "http://localhost:3000",
  // origin: "https://veteran-prostir-vn.netlify.app",
  origin: process.env.SITE_DOMAIN_LOCAL,
  origin: process.env.SITE_DOMAIN,
};

// const host = process.env.HOST;
const PORT = process.env.PORT || 4001;
// const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));

app.use(express.static("./public"));
// app.use(loger("dev"));

app.use("/auth", authRouter);
app.use("/useradmins", useradminRouter);
app.use("/attentionitems", attentionRouter);
app.use("/legalitems", legalRouter);
app.use("/resultworks", resultworkRouter);
app.use("/psychologicals", psychologicalRouter);
app.use("/legalaids", legalaidRouter);
app.use("/socioadvices", socioadviceRouter);
app.use("/rehabilitations", rehabilitationRouter);
app.use("/createworkshops", createworkshopRouter);
app.use("/womenclubs", womenclubRouter);
app.use("/announcements", announcementRouter);
app.use("/news", newRouter);

app.use("/images", uploadImagesRouter); //* з зжиманням в /images
app.use("/homeitems", homeitemsRouter);

app.use((error, req, res, next) => {
  res.status(500).json({ message: error.message });
});

async function start() {
  try {
    app.listen(PORT, async () => {
      await initDatabase();

      console.log("Server started listening on port", PORT);
    });
  } catch (error) {
    console.log("Start up error: ", error);
    process.exit(1);
  }
}

start();
