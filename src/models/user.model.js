const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { COLLECTIONS } = require("../common/collections.const");

const userSchema = new mongoose.Schema(
  {
    mobile: {
      type: Number,
      required: true,
      unique: true,
      minlength: 10,
      maxlength: 10,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    address: String,
    village: String,
    taluka: String,
    district: String,
    pinCode: Number,
    authToken: String,
    hashedOtp: String,
  },
  {
    timestamps: {
      created_at: "create_at",
      updated_at: "updated_at",
    },
  },
);

userSchema.methods.generateAuthToken = async function () {
  const token = jwt.sign({ _id: this._id.toString() }, process.env.AUTH_SECRET_KEY, {
    expiresIn: "1h",
  });
  this.authToken = token;
  await this.save();
  return token;
};

const User = mongoose.model("users", userSchema, COLLECTIONS.Users);
module.exports = User;
