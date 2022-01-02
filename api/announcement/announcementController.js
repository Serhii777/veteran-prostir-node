const announcementModel = require("./announcementModel");

const createAnnouncement = async (req, res, next) => {
  const announcement = await announcementModel.create(req.body);

  return res
    .status(201)
    .send({ message: `Announcement ${announcement} created` });
};

const getAnnouncements = async (req, res, next) => {
  const announcements = await announcementModel.find().sort({ date: -1 });

  return res.status(200).json(announcements);
};

const deleteAnnouncementById = async (req, res) => {
  const announcementId = req.params.id;
  const deleteAnnouncement = await announcementModel.findByIdAndDelete(
    announcementId
  );
  if (!deleteAnnouncement) {
    throw new NotFoundError("Announcement not found");
  }
  return res
    .status(200)
    .send({ message: `Announcement ${announcementId._id} deleted!` });
};

module.exports = {
  createAnnouncement,
  getAnnouncements,
  deleteAnnouncementById,
};
