const express = require('express');
const mysql = require('mysql2');
require('dotenv').config();

const PORT = 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
  {
    host: 'localhost', 
    user: process.env.DB_USER, //default is "root". Please update, to your configuration.
    password: process.env.DB_PASSWORD, //default is "". Please update, to your configuration.
    database: process.env.DB_NAME, //The program currently only have one database, as listed. 
  },
  console.log(`Connected to the employeeTracker_db database.`)
);

function performDatabaseQueries(queryType, callback) {

  let sqlQuery = ''; //this is the query key word search, based on query type. For example: 'SELECT * FROM Department'

  if (queryType === 'viewAllDepartments') {
    console.log('\n Department Names: \n');  //adds title to the table. 
    sqlQuery = 'SELECT * FROM Department';
  }
  // Add other query types as needed

  if (sqlQuery) {
    db.query(sqlQuery, (error, results) => {
      if (error) throw error;
      console.table(results);  //display table.
    });
  } else {
    console.log('Invalid query type.');
  }
}

app.use((req, res) => {
  res.status(404).end();
});



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = { performDatabaseQueries };