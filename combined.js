const inquirer = require("inquirer");
const mysql = require('mysql2');
require('dotenv').config();

// const inquirerRecursive = require("inquirer-recursive");
// inquirer.registerPrompt("recursive", inquirerRecursive);

const db = mysql.createConnection(
  {
    host: 'localhost', 
    //below items are from .env files. Please update with your user, password, and database name. 
    user: process.env.DB_USER, 
    password: process.env.DB_PASSWORD, 
    database: process.env.DB_NAME, 
  },
  console.log(`Connected to the employeeTracker database.`)
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
  else if(queryType === 'viewAllEmployee'){
    console.log('\n Employee: \n'); 
    sqlQuery = 'SELECT * FROM EMPLOYEE;';
  }
  else if (queryType==='rolesOnly'){
    sqlQuery = 'SELECT title FROM Role;';
  }
  else if (queryType==='departmentOnly'){
    sqlQuery = 'SELECT name FROM Department;';
    db.query(sqlQuery, (error, results) => {
        if (error) throw error;
        callback(results); 
    });
  }
  else {return console.log('Invalid Query type.');};

  if (sqlQuery) {
    db.query(sqlQuery, (error, results) => {
        if (error) throw error;
        console.table(results); //prints table of results. 
        // init(); //prompt inquirer menu again.
    });
  } else {
    console.log('Invalid query type.');
  }
}

async function addDatabaseQueries(queryType,data){
  if(queryType === 'addRole'){
    const [role,department,salary] = data;
    sqlQuery = `INSERT INTO roles(role, department,salary) Values (${role}, ${department}, ${salary});`;
    // console.log('New role added: ', data[0]); //double-check if this is correct.
  }
  else if (queryType==='addDepartment'){
    const [department] = data;
    sqlQuery = `INSERT INTO department (department) VALUES(${department};`;
  }
  else if (queryType === 'addEmployee'){
    const {firstName, lastName, department, manager} = data;
    // console.log(manager,department,lastName,firstName);
    sqlQuery = `INSERT INTO employee(first_name, last_name, role, manager) VALUES(${firstName}, ${lastName}, ${department},${manager});`;
  }
  else {return console.log('Invalid Query type.');};

  //add the input responses into database.
  if (sqlQuery) {
    db.query(sqlQuery, (error, results) => {
      if (error) throw error;
      // console.log(results);
    });
  } else {
    console.log('Invalid query type.');
  }
};

function updateEmployee_role(){
  sqlQuery = '';
  // pending.......
}

//function to validate user input (text). Requirement: 1-30 characters. 
function validateText(input) {
    const trimmedInput = input.trim(); // Remove leading and trailing spaces
    if (trimmedInput.length === 0) {
      return "Input cannot be empty.";
    } else if (trimmedInput.length > 30) {
      return "Input must be 30 characters or less.";
    }
    return true;
};

function updateEmployeeRole(){
    //update to new role
    roleList = "" //work in progress
    updateEmployee_role(); //run query. work in progress
};

function addEmployee(){ 

    let departmentList = [];
    // performDatabaseQueries('departmentOnly', (results) => {
    //     const departmentList = results.map((row) => row.name);
    //     // console.log("1: ", departmentList);
    //   });

    db.query('SELECT name FROM Department;', (error, results) => {
        if (error) throw error;
        // console.log(results);
        departmentList = results;
        
        const question = [
            {
                type:"text",
                name:"firstName",
                message: "What is the new Employee's FIRST Name? (Max: 30 characters)",
                validate: validateText
            },
            {
                type:"text",
                name:"lastName",
                message: "What is the new Employee's LAST Name? (Max: 30 characters)",
                validate: validateText
            },
            {
                type:"list",
                name:"department",
                message: "What is the new Employee's ROLE?",
                choices: departmentList //NEED LIST! 
            },
            {
                type:"list",
                name:"manager",
                message: "Who is the MANAGER for the new Employee?",
                choices: managerList //NEED LIST! 
            },
        ];
    
        inquirer.prompt(question).then(function (data) {
            // console.log(data);
            addDatabaseQueries('addEmployee', data);
        });
    });

    
};

function addRole(){ //name, salary, department

    //valid salary input. 
    function salaryvalid(input) {
        const decimalPattern = /^[+]?[0-9]*(?:\.[0-9]+)?$/; //regrex. Number must be positive, 0-9. Okay with decimal. 
        if (!decimalPattern.test(input)) {return console.log("This is not a decimal number.");};  // Test failed - NOT decimal.
        const roundedValue = parseFloat(input).toFixed(2); //Round to 2 decimal places
        return roundedValue; //return value if decimal, and it is already rounded to two places. 
    };

    // departmentList = await performDatabaseQueries

    const question = [
        {
            type:"text",
            name:"newRole",
            message: "What is the new name of the Role?",
            validate: validateText
        },
        {
            type:"text",
            name:"newSalary",
            message: "What is the salary?",
            validate: salaryvalid
        },
        {
            type:"list",
            name:"department",
            message: "What department does it belong to?",
            choice: departmentList //NEED LIST! 
        }
    ];

    inquirer.prompt(question).then(async (data)=>{ 
        const title = data.newRole;    
        const salary = data.newSalary;
        const department = data.department;
        //title, salary, department
        db.query(`INSERT INTO role (title,salary,department) VALUES ('${title}','${salary}','${department}');`, (error, results) => {
            if (error) {console.error("Error adding department:", error);} 
            else {console.log(`${newDepartment} Department added successfully!`);}
        });
        init();
    });
};

async function addEmployee() {
    
    const departmentList = await new Promise((resolve, reject) => {
        performDatabaseQueries('departmentOnly', (results) => {
            if (results) {
                const list = results.map((row) => row.name);
                resolve(list);
            } 
            else {
                reject("Unable to fetch department list");
            }
        });
    });
    const managerList = [1,2];
    // const managerList = await new Promise((resolve, reject) => {
    //     performDatabaseQueries('departmentOnly', (results) => {
    //         if (results) {
    //             const list = results.map((row) => row.name);
    //             resolve(list);
    //         } else {
    //             reject("Unable to fetch department list");
    //         }
    //     });
    // });

    const addEmployee_question = [
        {
            type: "text",
            name: "firstName",
            message: "What is the new Employee's FIRST Name? (Max: 30 characters)",
            validate: validateText,
        },
        {
            type: "text",
            name: "lastName",
            message: "What is the new Employee's LAST Name? (Max: 30 characters)",
            validate: validateText,
        },
        {
            type: "list",
            name: "department",
            message: "What is the new Employee's ROLE?",
            choices: departmentList,
        },
        {
            type: "list",
            name: "manager",
            message: "Who is the MANAGER for the new Employee?",
            choices: managerList,
        },
    ];

    const data = await inquirer.prompt(addEmployee_question);
    // console.log(data, " & ", typeof data)
    addDatabaseQueries('addEmployee', data); 
}

//Array of questions for initial user input
const questions = [
    {
        type:"list",
        name:"text",
        message: "What would you like to do?",
        choices: [
            "Add Department",
            "Add Employee",
            "Add Role",
            "Update Employee Role",
            "View All Departments",
            // "View All Employee",
            "View All Roles",
            "Quit"
        ]
    },
];

//function to initialize app
async function init() {

    const data = await inquirer.prompt(questions)
    if (data.text==="Quit"){return console.log("Goodbye-");} //exit function, if Quit is selected. 
    switch (data.text){
        case 'View All Departments':
            performDatabaseQueries('viewAllDepartments',(results)=>
            console.table(results));
            break;
        case "View All Roles":
            performDatabaseQueries('viewAllRoles',(results)=>
            console.table(results));
            break;
        // case "View All Employees":
        //     performDatabaseQueries('viewAllRoles',(results)=>
        //     console.table(results));
        //     break;    
        case "Add Employee":
            addEmployee();
            break;
        case "Update Employee Role":
            console.log("Update Employee Role: ");
            // updateEmployeeRole();
            break;
        case "Add Role":
            addRole();
            break;
        case "Add Department":
                console.log("Add Department: ");
                // addDepartment(); 
                inquirer.prompt({
                    type: "text",
                    name: "newDepartment",
                    message: "Please enter the name of the new department to add:",
                    validate: validateText
                })
                .then(async (data) => {
                    const newDepartment = data.newDepartment;    
                    db.query(`INSERT INTO department (name) VALUES ('${newDepartment}');`, (error, results) => {
                        if (error) {console.error("Error adding department:", error);} 
                        else {console.log(`${newDepartment} Department added successfully!`);}
                    });
                    init();
                })
            break;
        default:
            return;
    };
};

function intro(){
console.log("Welcome to Employee Information Database");
init();
}

intro();