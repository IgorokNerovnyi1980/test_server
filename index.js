const express = require("express");
const fs = require("fs");

const app = express();
const port = process.env.PORT || 3000;

const products_model = require("./src/products_model");

function readJSONFile(filename, callback) {
  fs.readFile(filename, function (err, data) {
    if (err) {
      callback(err);
      return;
    }
    try {
      callback(null, JSON.parse(data));
    } catch (exception) {
      callback(exception);
    }
  });
}

function saveResponse(data) {
  fs.writeFile(way, data, function (error) {
    if (error) throw error;
    console.log("writed file is done");
  });
}

app.use(express.json());

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS "
  );
  res.setHeader("Access-Control-Allow-Headers", "origin, content-type, accept");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

// app.get("/", async (req, res) => {

// });

app.get("/getAllData", async (req, res) => {
  products_model
    .getProducts()
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.post("/updateAllData", (req, res) => {});

app.listen(port, (err) => {
  if (err) {
    return console.log("something bad happened", err);
  }

  console.log(`server is listening on ${port}`);
});
