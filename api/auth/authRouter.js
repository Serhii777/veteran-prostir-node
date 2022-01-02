const { Router } = require("express");

const { asyncWrapper } = require("../helpers/asyncWrapper");
const {
  verifyEmail,
  authorize,
  signUp,
  signIn,
  logout,
} = require("./authController");
const { validateSignUp, validateSignIn } = require("./authValidator");

const authRouter = Router();


authRouter.post("/signup", validateSignUp, asyncWrapper(signUp));

authRouter.put("/login", validateSignIn, asyncWrapper(signIn));

authRouter.get("/verify/:verificationToken", asyncWrapper(verifyEmail));

authRouter.patch("/logout", authorize, asyncWrapper(logout));

module.exports = authRouter;
