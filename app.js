const express = require("express");
const app = express();

const path = require("path");

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "/views/index.html"));
});

app.get("/login", function (req, res) {
  res.sendFile(path.join(__dirname, "/views/login.html"));
});

app.get("/productCart", function (req, res) {
  res.sendFile(path.join(__dirname, "/views/productCart.html"));
});

app.get("/productDetail", function (req, res) {
  res.sendFile(path.join(__dirname, "/views/productDetail.html"));
});

app.get("/registerClient", function (req, res) {
  res.sendFile(path.join(__dirname, "/views/registerClient.html"));
});

app.get("/registerProf", function (req, res) {
  res.sendFile(path.join(__dirname, "/views/registerProf.html"));
});

app.listen(3000, function () {
  console.log("servidor activo");
});

app.use(express.static(path.join(__dirname, "public")));
