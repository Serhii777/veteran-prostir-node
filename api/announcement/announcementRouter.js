const { Router } = require("express");
const announcementRouter = Router();

const { asyncWrapper } = require("../helpers/asyncWrapper");
const {
  createAnnouncement,
  getAnnouncements,
  deleteAnnouncementById,
} = require("./announcementController");

announcementRouter.post("/", asyncWrapper(createAnnouncement));

announcementRouter.get("/", asyncWrapper(getAnnouncements));

announcementRouter.delete("/:id", asyncWrapper(deleteAnnouncementById));

module.exports = announcementRouter;
