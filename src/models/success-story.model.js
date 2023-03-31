const mongoose = require("mongoose");

const farmerSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  address: String,
  village: String,
  city: String,
  district: String,
  pinCode: Number,
});

const successStorySchema = new mongoose.Schema({
  title: String,
  description: String,
  farmerDetails: farmerSchema,
});

module.exports = mongoose.model(
  "success-story",
  successStorySchema,
  "success-stories"
);
