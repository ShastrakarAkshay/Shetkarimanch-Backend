const mongoose = require("mongoose");
const { ServerApiVersion } = require("mongodb");
const username = "AkshayShastrakar";
const password = "FDZu1v4JPa2FCbyq";
const URL = `mongodb+srv://${username}:${password}@shetkimanch.wq66pzi.mongodb.net/?retryWrites=true&w=majority`;

exports.connect = () => {
  mongoose
    .connect(URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverApi: ServerApiVersion.v1,
    })
    .then(() => console.log("Connected to DB."))
    .catch((err) => console.log("DB connection failed."));
};
