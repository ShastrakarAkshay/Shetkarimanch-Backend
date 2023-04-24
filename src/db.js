const mongoose = require("mongoose");
const { ServerApiVersion } = require("mongodb");
const { CONFIG } = require("./app.config");

const connect = () => {
  mongoose
    .connect(CONFIG.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverApi: ServerApiVersion.v1,
    })
    .then(() => console.log("Connected to DB."))
    .catch(() => console.log("DB connection failed."));
};

module.exports = { connect };
