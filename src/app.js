require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const db = require("./db");
const routes = require("./app-routes");

const PORT = process.env.PORT || 8000;
const app = express();
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false });

db.connect();
app.use("/api", jsonParser, routes);

app.listen(PORT, () => console.log("App is running on port", PORT));
