const express = require("express");
const app = express();

const path = require("path");

const mainRoute = require("./routes/main-routers.js");
const profRoute = require("./routes/professionals-routers.js");

app.set("view engine", "ejs");

app.use("/", mainRoute); // req es la "/" y el res es el main-router, el encargado de redirigir

app.use("/professionals", profRoute);

app.listen(3000, function () {
  console.log("servidor activo");
});

app.use(express.static(path.join(__dirname, "public")));
