const mongoose = require("mongoose");
const { COLLECTIONS } = require("../common/collections.const");

const farmerSchema = new mongoose.Schema({
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
});

const corpSchema = new mongoose.Schema({
  corpName: String,
  description: String,
});

const successStorySchema = new mongoose.Schema(
  {
    image: Blob,
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    farmerDetails: farmerSchema,
    corpInfo: corpSchema,
    youtubeLink: String,
    facebookLink: String,
    createdBy: {
      type: String, // userId of creator
      required: true,
    },
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
