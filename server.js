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
  let sqlQuery = ''; //this is the query-keyword search, based on query type. For example: 'SELECT * FROM Department' for view all departments

  if (queryType === 'viewAllDepartments') {
    console.log('\n Department Names: \n');  //adds title to the table. 
    sqlQuery = 'SELECT * FROM Department;';
  }
  else if(queryType === 'viewAllRoles'){
    console.log('\n Roles: \n'); 
    sqlQuery = 'SELECT * FROM Role;';
  }
  else if (queryType==='rolesOnly'){
    sqlQuery = 'SELECT title FROM Role;';
  }
  else if (queryType==='departmentOnly'){
    sqlQuery = 'SELECT name FROM Department;';
  }
  else {return console.log('Invalid Query type.');};

  if (sqlQuery) {
    db.query(sqlQuery, (error, results) => {
      if (error) throw error;
      // console.log(results);
      callback(results);
    });
  } else {
    console.log('Invalid query type.');
  }
}

function addDatabaseQueries(queryType,data,callback){
  if(queryType === 'addRole'){
    const [role,department,salary] = data;
    sqlQuery = `INSERT INTO roles(role, department,salary) Values (${role}, ${department}, ${salary});`;
    console.log('New role added: ', data[0]); //double-check if this is correct.
  }
  else if (queryType==='addDepartment'){
    const [department] = data;
    sqlQuery = `INSERT INTO department (department) VALUES(${department};`;
  }
  else if (queryType === 'addEmployee'){
    const {firstName, lastName, department, manager} = data;
    console.log(manager,department,lastName,firstName);
    sqlQuery = `INSERT INTO employee(first_name, last_name, role, manager) VALUES(${firstName}, ${lastName}, ${department},${manager});`;
  }
  else {return console.log('Invalid Query type.');};

  //add the input responses into database.
  if (sqlQuery) {
    db.query(sqlQuery, (error, results) => {
      if (error) throw error;
      // console.log(results);
      callback(results);
    });
  } else {
    console.log('Invalid query type.');
  }
};

function updateEmployee_role(){
  sqlQuery = '';
  // pending.......
}

app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = { 
  performDatabaseQueries, 
  addDatabaseQueries,
  updateEmployee_role
};