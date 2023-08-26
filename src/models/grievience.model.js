const mongoose = require("mongoose");
const { COLLECTIONS } = require("../common/collections.const");

const grievienceSchema = new mongoose.Schema(
  {
    grievienceId: { type: String, required: true },
    talukaId: { type: String, required: true },
    departmentId: {
      type: String,
      required: true,
    },
    designationId: {
      type: String,
    },
    subject: {
      type: String,
      required: true,
    },
    other: {
      type: String,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: Number,
    },
    userId: {
      type: String,
    },
    feedbacks: [], // {message: string, submitter: id}
    document: {
      id: String,
      name: String,
      api: String,
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

module.exports = mongoose.model(
  "grieviences",
  grievienceSchema,
  COLLECTIONS.Grieviences,
);
