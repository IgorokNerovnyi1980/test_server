const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser());
const port = "https://hotdogs-server.herokuapp.com";
const way = "./src/newDATA.json";

let datas = null;

//TODO
//1. добавить в роутах проверку try/catch
//2. решить проблему со считыванием файла - первое обращение = {datas:null}, второе обращение {datas:haveData}

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

app.get("/getAllData", async (request, response) => {
  readJSONFile(way, function (err, data) {
    if (err) throw err;
    datas = data;
  });

  response.type("application/json");
  response.header("Access-Control-Allow-Origin", "*");
  response.header(
    "Access-Control-Allow-Headers",
    "origin, content-type, accept"
  );
  // console.log('datas', datas)
  response.send(datas);
  response.end();
});

app.post("/updateAllData", (request, response) => {
  if (request) {
    response.header("Access-Control-Allow-Origin", "*");
    response.header(
      "Access-Control-Allow-Headers",
      "origin, content-type, accept"
    );
    response.send("have data");
    response.end(saveResponse(JSON.stringify(request.body.data)));
  }
});

app.listen(port, (err) => {
  if (err) {
    return console.log("something bad happened", err);
  }

  console.log(`server is listening on ${port}`);
});
