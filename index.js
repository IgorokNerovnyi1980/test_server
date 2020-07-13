const express = require("express");

const app = express();
const port = process.env.PORT || 3000;

const products_model = require("./src/products_model");

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

app.post("/createNew", (req, res) => {
  products_model
    .createProduct(req.body)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.post("/update", (req, res) => {
  products_model
    .updateProduct(req.body)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.delete("/delete/:id", (req, res) => {
  products_model
    .deleteProduct(req.params.id)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.listen(port, (err) => {
  if (err) {
    return console.log("something bad happened", err);
  }

  console.log(`server is listening on ${port}`);
});
