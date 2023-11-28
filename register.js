const express = require('express');
const app = express();
const mysql = require('mysql2');
const PORT = 3001;
const bodyParser = require('body-parser');

const jsonParser = bodyParser.json();

const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Anusreecoddle4*',
  database: 'clinic'
});

con.connect(function (err) {
  if (err) {
    console.error('Error connecting to database:', err.message);
  } else {
    console.log('Connected to database');
  }
});

app.get('/', function (req, res) {
  res.send('<h1>This is the root page</h1>');
});

app.post('/signup', jsonParser, function (req, res) {
  console.log('Request Body:', req.body);
  const name = req.body.name;
  const username = req.body.username;
  const password = req.body.password;
  const age = req.body.age;
  const gender = req.body.gender;
  const phone = req.body.phone;
  const bloodgroup = req.body.blood_group;

  const qr = 'INSERT INTO patients (name, username, password, age, gender, phone, bloodgroup) VALUES (?, ?, ?, ?, ?, ?, ?)';
  const values = [name, username, password, age, gender, phone, bloodgroup];
  
  con.query(qr, values, (err, result) => {
    if (err) {
      console.error('Error executing query:', err.message);
      res.send({ error: 'operation failed' });
    } else {
      res.send({ success: 'operation completed' });
    }
  });
});

app.listen(PORT, function () {
  console.log(`Server running at: http://localhost:${PORT}/`);
});
