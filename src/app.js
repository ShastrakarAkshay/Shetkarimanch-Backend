const express = require("express");
const db = require("./db");
const routes = require("./routes/routes");
const PORT = 1810;
const app = express();

db.connect();
app.listen(PORT, () => console.log("App started on port", PORT));
app.use(routes);
