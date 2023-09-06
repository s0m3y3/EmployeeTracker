const express = require('express');
const mysql = require('mysql2');

const PORT = 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
  {
    host: 'localhost', 
    user: 'root', //default is "root". Please update, to your configuration.
    password: '', //default is "". Please update, to your configuration.
    database: 'employeeTracker_db' //The program currently only have one database, as listed. 
  },
  console.log(`Connected to the employeeTracker_db database.`)
);

let sqlQuery ="";
function performDatabaseQueries(queryType) {
  db;
  
  // Query to select department names
  if (queryType === 'viewAllDepartments') { sqlQuery = 'SELECT name FROM Department';} 
  else if (queryType === 'viewAllRoles') { sqlQuery = 'SELECT title FROM Role'
    // pending code.
  }
  //pending more. 

  if (sqlQuery) {
    connection.query(sqlQuery, (error, results) => {
      if (error) throw error;
  
      console.log('Query result:', results);
  
      // You can process and display the results as needed
      // For example, results may be an array of department names
      results.forEach(row => {
        console.log(`Department Name: ${row.name}`);
      });
  
      connection.end();
    });
  } else {
    console.log('Invalid query type.');
    connection.end();
  };
};

app.use((req, res) => {
  res.status(404).end();
});



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = { performDatabaseQueries };