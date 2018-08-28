
"use strict";
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'pokemon',
  insecureAuth : true
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected!');
});

const app = express();
app.use(cors());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/getPokestops', (req, res, next) => {
  // Getting the pokestops also gets the tasks and gives the pokestops
  // the relationship with the task and also the property on the same object
  connection.query(`
  SELECT tasks.requirements, tasks.reward, tasks.pokestop_id, pokestops.*,
  CASE
    WHEN tasks.task_date_end_time > NOW()
    THEN 'true'
    ELSE 'false'
    END active
  FROM pokestops
  LEFT JOIN tasks
  ON tasks.pokestop_id = pokestops.id
  `, (err, pokestops) =>{
    if (err) {
      next(err);
    } else {
      res.send(pokestops);
    }
  })
})
// WHERE tasks.task_date_end_time > NOW()
app.get('/getTodaysTasks', (req, res, next) => {
  // This route pulls submitted tasks from today on page load
  connection.query(`
  SELECT tasks.requirements, tasks.reward, tasks.pokestop_id, pokestops.*,
  CASE
    WHEN tasks.task_date_end_time > NOW()
    THEN 'true'
    ELSE 'false'
    END active
  FROM pokestops
  LEFT JOIN tasks
  ON tasks.pokestop_id = pokestops.id
  `, (err, allTasks) =>{
    if (err) {
      next(err);
    } else {
      console.log('allTasks',allTasks);
      res.send(allTasks);
    }
  })
})


app.post('/addTask/:id', (req, res) => {
  // This route sends a user-submitted task as a POST request
  // It gives the server the pokestop_id as a req.param so i can use that as
  // the tasks associated pokestop in the database
  const sql = `
    INSERT INTO tasks (
      requirements,
      reward,
      pokestop_id,
      task_date_string,
      task_date_and_submission_time,
      task_date_end_time
    )
    VALUES (
      '${req.body.requirements}',
      '${req.body.reward}',
      ${req.body.pokestop_id},
      '${req.body.task_date_string}',
      '${req.body.task_date_and_submission_time}',
      '${req.body.task_date_end_time}'
    )`;
  connection.query(sql, function (err, result) {
    if (err) {
      throw err;
    } else {
      console.log("Number of records inserted: " + result.affectedRows);
      res.sendStatus(200);
    }
  })
})

app.post('/addNewPokestop', (req, res, next) => {
  // This endpoint sends a user-submitted pokestop as a POST request
  // It first checks to make sure the lat/long values being sent
  // are within the boundaries of the area I have set up

  // These are the boundaries for pokesotp submission. They form a square around niddle TN
  const westmostLocation = [36.073201300051345, -87.39700190267196]; // west past Dickson
  const northmostLocation = [36.64965136535208, -86.79136861074458]; // Kentucky border
  const eastmostLocation = [35.95737315896857, -83.47954587059279]; // east past Knoxville
  const southmostLocation = [34.56341006121154, -86.60234843420953]; // below Huntsville

  // If the submission is not within these boundaries, it sends back an error
  if (req.body.latitude < southmostLocation[0] || req.body.latitude > northmostLocation[0] || req.body.longitude < westmostLocation[1], req.body.longitude > eastmostLocation[1]){
    let locationError = new Error("That pokestop is not in middle TN. Double check your lat/long values, or please choose a pokestop in middle TN.");
    next(locationError);
  } else {
    const sql = `
      INSERT INTO pokestops (name, latitude, longitude, date_submitted)
      VALUES (
        '${req.body.name}',
        ${req.body.latitude},
        ${req.body.longitude},
        '${req.body.date_submitted}'
      )`;
    connection.query(sql, function (err, result) {
      if (err) {
        throw err;
      } else {
        res.sendStatus(200);
        console.log("Number of records inserted: " + result.affectedRows);
      }
    });
  }
})

// Error handler
app.use((err, req, res, next ) => {
  // err = err || new Error("Internal Server Error");
  if (err) { console.log(err)}
  res.status( err.status || 500);
  res.json({ error: err.message });
});
app.listen(8080, () => {
  console.log('listening on http://localhost:8080');
});