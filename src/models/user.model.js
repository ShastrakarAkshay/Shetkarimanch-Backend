const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    mobile: String,
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

const User = mongoose.model("users", userSchema, "users");
module.exports = User;
