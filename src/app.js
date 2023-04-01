const express = require("express");
const bodyParser = require("body-parser");
const db = require("./db");
const routes = require("./routes/app-routes");

const PORT = 1810;
const app = express();
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false });

db.connect();
app.use("/api", jsonParser, routes);

app.listen(PORT, () => console.log("App started on port", PORT));
