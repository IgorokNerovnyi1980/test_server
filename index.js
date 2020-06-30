// const datas = require('./src/data.json')
// const datas = require('./src/newDATA.json')
const express = require('express')
const fs = require('fs')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser())
const port = 3000
const way = './src/newDATA.json'

let datas = null;

function readJSONFile(filename, callback) {
    fs.readFile(filename, function (err, data) {
      if(err) {
        callback(err);
        return;
      }
      try {
        callback(null, JSON.parse(data));
      } catch(exception) {
        callback(exception);
      }
    });
  }




function saveResponse (data){ fs.writeFile(way, data, function(error){

    if(error) throw error;
    console.log("writed file is done");
})};


app.get('/getAllData', (request, response) => {
    response.type('application/json')
    response.header('Access-Control-Allow-Origin', '*')
    response.header('Access-Control-Allow-Headers', 'origin, content-type, accept')
    readJSONFile(way, function (err, data) {
        if (err) throw err;
        datas = data
      });
    console.log('datas', datas)
    response.send(datas)
    response.end()
})

app.post('/updateAllData', (request, response) => {
   
    if(request){
        response.header('Access-Control-Allow-Origin', '*')
        response.header('Access-Control-Allow-Headers', 'origin, content-type, accept')
        response.send('have request')
        response.end(console.log(JSON.stringify(request.body)))
    }
})

app.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }

    console.log(`server is listening on ${port}`)
})