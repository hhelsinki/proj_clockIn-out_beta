const { response } = require('express');
const fs = require('fs');
var express = require('express');
var app = express();
app.listen(5000, () => console.log('running in: 5000'));
app.use(express.static('public'));
app.use(express.json({ limit: '1mb' }));

//test
process.env.TZ = "Asia/Bangkok";
var now = new Date();
const getToday = now.toLocaleDateString('en-CA', {timeZone: 'Asia/Bangkok'});

app.post('/post', (req, res) => {
  console.log('got request! POST');
  console.log(req.body);
  res.json({
    status: "success write"
  });
  WriteJson();

});

app.post('/update', (req, res) => {
  console.log('got request! UPDATE');
  console.log(req.body);
  res.json({
    status: "success update"
  });
  UpdateJson();
})




//WRITE
function WriteJson() {
  
  const current_clockIn = now.getHours() + ':' + now.getMinutes();
  


  function Staff(name, date, clockIn, clockOut) {
    this.name = name;
    this.date = date;
    this.clockIn = clockIn;
    this.clockOut = clockOut;

  }

  const jonathanB = new Staff("Jonathan B", getToday,current_clockIn, " ");

  const jsonString = JSON.stringify(jonathanB, null, 2);
  const fileName = './public/export_JSON/jonathanB/jonathanB'+ '_' + getToday + '.json';

  fs.writeFile(fileName, jsonString, err => {
    if (err) { console.log("Error") }
    else { console.log("Successfull write") }
  });
}

//UPDATE
function UpdateJson() {
  function jsonReader(filePath, cb) {
    fs.readFile(filePath, (err, fileData) => {
      if (err) {
        return cb && cb(err);
      }
      try {
        const object = JSON.parse(fileData);
        return cb && cb(null, object);
      } catch (err) {
        return cb && cb(err);
      }
    });
  }
  
  const current_clockOut = now.getHours() + ':' + now.getMinutes();
  const fileName = './public/export_JSON/jonathanB/jonathanB'+ '_' + getToday + '.json';

  jsonReader(fileName, (err, data) => {
    if (err) {
      console.log("Error reading file:", err);
    }

  
    data.clockOut = current_clockOut;
    fs.writeFile(fileName, JSON.stringify(data, null, 2), err => {
      if (err) console.log(err);
    });
  });
  jsonReader();
}




