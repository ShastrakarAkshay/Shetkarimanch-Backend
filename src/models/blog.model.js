const mongoose = require("mongoose");
const { COLLECTIONS } = require("../common/collections.const");

const blogSchema = new mongoose.Schema(
  {
    image: {
      type: String,
    },
    title: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    state: {
      type: Number,
      enum: {
        values: [1, 2],
        message: "{VALUE} is not supported",
      },
      required: true,
    },
  },
  {
    // bufferTimeoutMS // needs to learn
    timestamps: {
      created_at: "created_at",
      updated_at: "updated_at",
    },
  },
);

module.exports = mongoose.model("blogs", blogSchema, COLLECTIONS.Blogs);
