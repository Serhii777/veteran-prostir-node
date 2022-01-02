const { Router } = require("express");
const useradminRouter = Router();

const { authorize } = require("../auth/authController");
const { validateUpdateUseradmin } = require("./useradminValidation");
const { asyncWrapper } = require("../helpers/asyncWrapper");
const {
  getUseradmins,
  getCurrentUseradmin,
  getUseradminById,
  updateUseradmin,
  deleteUseradminById,
} = require("./useradminController");

useradminRouter.get("/current", authorize, asyncWrapper(getCurrentUseradmin));

useradminRouter.get("/", asyncWrapper(getUseradmins));

useradminRouter.get("/:id", authorize, asyncWrapper(getUseradminById));

useradminRouter.put(
  "/:id",
  authorize,
  validateUpdateUseradmin,
  asyncWrapper(updateUseradmin)
);

useradminRouter.delete("/:id", authorize, asyncWrapper(deleteUseradminById));

module.exports = useradminRouter;
