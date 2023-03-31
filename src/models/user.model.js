const mongoose = require("mongoose");
const { COLLECTIONS } = require("../common/collections.const");

const userSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    mobile: String, // should be unique and used for login
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
