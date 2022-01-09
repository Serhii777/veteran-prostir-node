const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });

const bcryptjs = require("bcrypt");
const useradminModel = require("../useradmins/useradminModel");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

const sgMail = require("@sendgrid/mail");
const nodemailer = require("nodemailer");

const { UnauthorizedError } = require("../errors/errors");

const listAccessEmail = [
  process.env.ACCESS_EMAIL_MSV,
  process.env.ACCESS_EMAIL_VP,
  process.env.ACCESS_EMAIL_KOF,
  process.env.ACCESS_EMAIL_VPM,
];

//! Registration ================================
const signUp = async (req, res, next) => {
  const { password, name, email } = req.body;
  // console.log("req.bodySignUp:", req.body);

  const existingUseradmin = await useradminModel.findUserByEmail(email);

  if (existingUseradmin) {
    return res
      .status(400)
      .send({ message: `User with such email: ${email} already exists!` });
  }

  const passwordHash = await bcryptjs.hash(password, 6);

  console.log("listAccessEmail:", listAccessEmail);

  const allowEmail = listAccessEmail.find(
    (item) =>
      // console.log("item:", item);
      // console.log("req.body.email:", req.body.email);
      item === req.body.email
  );

  console.log("allowEmail11111:", allowEmail);

  if (!allowEmail) {
    throw new UnauthorizedError(
      `Користувач з електронною поштою: ${email} не має допуску до адміністративної частини сайту!`
    );
  }

  let useradmin = {};

  allowEmail !== undefined
    ? (useradmin = await useradminModel.create({
        ...req.body,
        name,
        email,
        password: passwordHash,
      }))
    : (useradmin = null);

  console.log("useradmin:", useradmin);

  await sendVerificationEmail(useradmin);

  if (useradmin !== null) {
    return res.status(201).json({
      name: useradmin.name,
      email: useradmin.email,
    });
  } else {
    return res.status(400).send({
      message: `Користувач з електронною поштою: ${email} не має допуску до адміністративної частини сайту!`,
    });
  }
};

//! Login ======================================================
const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const token = await checkUseradmin(email, password);

    if (!token) {
      throw new UnauthorizedError(
        // `Useradmin with email ${email} doesn't exist! You need to register to access the site administration!`
        `Користувача з емейлом ${email} не існує. Щоб отримати доступ до адміністрування сайту, вам потрібно зареєструватися.`
      );

      // return res.status(400).send({message: `Користувача з емейлом ${email} не існує. Щоб отримати доступ до адміністрування сайту, вам потрібно зареєструватися.`})
    } else {
      const useradmin = await useradminModel.findUserByEmail(email);

      return res.status(200).json({
        token,
        useradmin: {
          email: email,
          name: useradmin.name,
        },
      });
    }
  } catch (error) {
    next(error);
  }
};

const checkUseradmin = async (email, password) => {
  try {
    const useradmin = await useradminModel.findUserByEmail(email);

    if (!useradmin) {
      throw new UnauthorizedError(
        `Useradmin with email ${email} doesn't exist!`
      );
    }

    if (useradmin.status !== "Verified") {
      throw new UnauthorizedError("Authentication failed!111");
    }

    const isPasswordValid = await bcryptjs.compare(
      password,
      useradmin.password
    );
    if (!isPasswordValid) {
      throw new UnauthorizedError("Authentication failed!222");
    }

    const token = jwt.sign(
      {
        id: useradmin._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: 1000 * 60 * 60 * 12 } //12 hours
    );

    await useradminModel.updateToken(useradmin._id, token);

    return token;
  } catch (error) {
    console.log("errorCheckUseradmin:", error);
  }
};

//! Logout ====================================================
const logout = async (req, res, next) => {
  const useradmin = req.useradmin;

  await useradminModel.updateToken(useradmin._id, null);

  return res
    .status(200)
    .send({ message: `Useradmin ${useradmin.email} is logged out` });
};

const authorize = async (req, res, next) => {
  const authorizationHeader = req.get("Authorization" || "");
  if (!authorizationHeader) {
    next(new UnauthorizedError("User not authorized"));
  }
  const token = authorizationHeader.replace("Bearer ", "");

  let useradminId;
  try {
    useradminId = await jwt.verify(token, process.env.JWT_SECRET).id;
  } catch (err) {
    next(new UnauthorizedError("User not authorized"));
  }

  const useradmin = await useradminModel.findById(useradminId);
  if (!useradmin || useradmin.token !== token) {
    throw new UnauthorizedError("User not authorized");
  }

  req.useradmin = useradmin;
  req.token = token;

  next();
};

const sendVerificationEmail = async (useradmin) => {
  try {
    const verificationToken = uuidv4();

    await useradminModel.createVerificationToken(
      useradmin._id,
      verificationToken
    );

    await sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      // host: "smtp.ethereal.email",
      // port: 587,
      auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const mailOptions = {
      from: process.env.NODEMAILER_USER, // от кого
      to: useradmin.email, // кому
      subject: "Підтвердження Вашої електронної пошти", // Subject line
      text: "Будь-ласка, підтвердіть Вашу електронну пошту",
      html: `<div><h2>Привіт друже!</h2><h3>Ласкаво просимо до адміністративної частини сайту.</h3><p>Ви можете підтвердити Вашу електронну пошту за посиланням: <a href='${process.env.SITE_DOMAIN_HEROKU}auth/verify/${verificationToken}'>Натисніть тут</a> 👍 !!!</p></div>`,
    };

    console.log("mailOptions:", mailOptions);

    // await sgMail.send(mailOptions);

    // sgMail
    //   .send(mailOptions)
    //   .then(() => {
    //     console.log("Email sent successfully!!!!!");
    //   })
    //   .catch((error) => {
    //     console.error("error:", error);
    //   });

    async function main() {
      const result = await transporter.sendMail(
        mailOptions,
        function (err, info) {
          if (err) {
            console.log("err1111", err);
          } else {
            console.log("info", info);
          }
        }
      );
      console.log("Email sent successfully!", { result });
    }
    main();
  } catch (err) {
    console.log(err);
  }
};

const verifyEmail = async (req, res, next) => {
  const {
    params: { verificationToken },
  } = req;

  const useradminToVerify = await useradminModel.findByVerificationToken(
    verificationToken
  );

  if (!useradminToVerify) {
    return res.status(404).send({ message: "User not found." });
  }

  await useradminModel.verifyUser(useradminToVerify._id);

  return res.status(200).send({ message: "You're user successfully verified" });
};

module.exports = {
  signUp,
  signIn,
  logout,
  authorize,
  sendVerificationEmail,
  verifyEmail,
};
