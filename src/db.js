const mongoose = require("mongoose");
const { ServerApiVersion } = require("mongodb");
const username = "AkshayShastrakar";
const password = "FDZu1v4JPa2FCbyq";
const database = "ShetkiManch";
const URL = `mongodb+srv://${username}:${password}@shetkimanch.wq66pzi.mongodb.net/${database}?retryWrites=true&w=majority`;

const connect = () => {
  mongoose
    .connect(URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverApi: ServerApiVersion.v1,
    })
    .then(() => console.log("Connected to DB."))
    .catch(() => console.log("DB connection failed."));
};

module.exports = { connect };
