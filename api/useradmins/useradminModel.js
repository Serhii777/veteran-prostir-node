const mongoose = require("mongoose");
const { Schema } = mongoose;

const useradminSchema = new Schema({
  // name: { type: String, require: true },
  name: String,
  email: {
    type: String,
    validate: (value) => value.includes("@"),
    require: true,
    uniq: true,
    lowercase: true,
  },
  password: { type: String, default: "password", require: true },
  status: {
    type: String,
    require: true,
    enum: ["Verified", "Created"],
    default: "Created",
  },
  verificationToken: String,
  token: String,
});

useradminSchema.statics.findUserByIdAndUpdate = findUserByIdAndUpdate;
useradminSchema.statics.findUserByEmail = findUserByEmail;
useradminSchema.statics.updateToken = updateToken;
//! Для Email
useradminSchema.statics.createVerificationToken = createVerificationToken;
useradminSchema.statics.findByVerificationToken = findByVerificationToken;
useradminSchema.statics.verifyUser = verifyUser;

async function findUserByIdAndUpdate(useradminId, updateParams) {
  return this.findByIdAndUpdate(
    useradminId,
    {
      $set: updateParams,
    },
    {
      new: true,
    }
  );
}

async function findUserByEmail(email) {
  return this.findOne({ email });
}

async function updateToken(id, newToken) {
  return this.findByIdAndUpdate(id, {
    token: newToken,
  });
}

async function createVerificationToken(useradminId, verificationToken) {
  return this.findByIdAndUpdate(
    useradminId,
    {
      verificationToken,
    },
    {
      new: true,
    }
  );
}

async function findByVerificationToken(verificationToken) {
  return this.findOne({
    verificationToken,
  });
}

async function verifyUser(useradminId) {
  return this.findByIdAndUpdate(
    useradminId,
    {
      status: "Verified",
      verificationToken: null,
    },
    {
      new: true,
    }
  );
}

//* "useradmins"
const useradminModel = mongoose.model("Useradmin", useradminSchema);

module.exports = useradminModel;
