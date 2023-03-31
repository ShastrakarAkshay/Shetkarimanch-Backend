const mongoose = require("mongoose");
const { COLLECTIONS } = require("../common/collections.const");

const farmerSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  address: String,
  village: String,
  city: String,
  district: String,
  pinCode: Number,
});

const corpSchema = new mongoose.Schema({
  corpName: String,
  description: String,
});

const successStorySchema = new mongoose.Schema(
  {
    image: Blob,
    title: String,
    description: String,
    farmerDetails: farmerSchema,
    corpInfo: corpSchema,
    youtubeLink: String,
    facebookLink: String,
    createdBy: String | Number, // RoleId of logged in user
  },
  {
    timestamps: {
      created_at: "created_at",
      updated_at: "updated_at",
    },
  }
);

module.exports = mongoose.model(
  "success-story",
  successStorySchema,
  COLLECTIONS.SuccessStories
);
