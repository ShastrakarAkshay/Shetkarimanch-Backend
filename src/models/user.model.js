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
    roleId: {
      type: Number || String,
      default: 1,
      enum: {
        values: [1, 2],
        message: "{VALUE} is not supported",
      },
    },
    tokens: {
      authToken: String,
      otpToken: String,
    },
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
    expiresIn: 60 * 60, // 1 hour
  });
  this.tokens.authToken = token;
  await this.save();
  return token;
};

userSchema.methods.generateOtpToken = async function (otp) {
  const token = jwt.sign({ _otp: otp.toString() }, process.env.OTP_SECRET_KEY, {
    expiresIn: 60 * 3, // 3 minutes
  });
  this.tokens.otpToken = token;
  await this.save();
  return token;
};

userSchema.methods.verifyOtpToken = async function () {
  const { _otp } = jwt.verify(this.tokens.otpToken, process.env.OTP_SECRET_KEY);
  return _otp;
};

// for registration
userSchema.statics.generateRegOtpToken = async function (otp, mobile) {
  const regOtpToken = jwt.sign(
    {
      _otp: otp.toString(),
      _mobile: mobile.toString(),
    },
    process.env.REGISTER_OTP_SECRET_KEY,
    {
      expiresIn: 60 * 3, // 3 minutes
    },
  );
  return regOtpToken;
};

const User = mongoose.model("users", userSchema, COLLECTIONS.Users);
module.exports = User;
