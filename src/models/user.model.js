const mongoose = require("mongoose");
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
    city: String,
    district: String,
    pinCode: Number,
  },
  {
    timestamps: {
      created_at: "create_at",
      updated_at: "updated_at",
    },
  }
);

const User = mongoose.model("users", userSchema, COLLECTIONS.Users);
module.exports = User;
