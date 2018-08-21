const express = require('express');
const mysql = require('mysql');
const factory = require('./factory');
const bodyParser = require('body-parser');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  // database: 'first_tester',
  insecureAuth : true
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected!');
});

const app = express();
app.use(express.static('public'));
app.use(bodyParser.json())

app.post('/addNewPokestop', (req, res) => {
  console.log('req: ',req);
  factory.addNewPokestop({
    name: req.body.name,
    longitude: req.body.longitude,
    latitude: req.body.latitude,
  })
  .then(() => res.sendStatus(200))
})

app.post('/addTask', (req, res) => {
  console.log('req: ',req);
  factory.addNewPokestop({
    name: req.body.name,
    longitude: req.body.longitude,
    latitude: req.body.latitude,
  })
  .then(() => res.sendStatus(200))
})

const addTaskRoute = express.Router();

addTaskRoute.post('/addTask', (req, res) => {
  console.log('req: ',req);
  factory.addTask({
    name: req.body.name,
    longitude: req.body.longitude,
    latitude: req.body.latitude,
  })
  .then((someData) => res.send(someData))
})

app.use("/", addTaskRoute);

app.listen(8080);