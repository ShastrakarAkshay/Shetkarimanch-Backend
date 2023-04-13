const mongoose = require("mongoose");
const { COLLECTIONS } = require("../common/collections.const");
const roleSchema = new mongoose.Schema(
  {
    role: { type: String, required: true },
    roleId: { type: Number, required: true },
  },
  {
    timestamps: {
      created_at: "create_at",
      updated_at: "updated_at",
    },
  },
);

module.exports = mongoose.model("role", roleSchema, COLLECTIONS.Roles);
