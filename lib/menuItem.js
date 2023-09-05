const { validateHeaderName } = require("http");
const inquirer = require("inquirer");

//function to validate text. Requirements: 0-30 characters. 
function validateText(input) {
    const trimmedInput = input.trim(); // Remove leading and trailing spaces
    if (trimmedInput.length === 0) {
      return "Input cannot be empty.";
    } else if (trimmedInput.length > 30) {
      return "Input must be 30 characters or less.";
    }
    return true;
};

function viewAllDepartments(){
    //view database of departments
};

function viewAllRoles(){
    //view role database
};

function addEmployee(){ //first, last name, role, manager

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
            choice: departmentList //NEED LIST! 
        },
        {
            type:"list",
            name:"manager",
            message: "Who is the MANAGER for the new Employee?",
            choice: managerlist //NEED LIST! 
        },
    ];

    inquirer.prompt(question).then(function (data) {
        //add code to add into database. 
    });
};

function updateEmployeeRole(){
    //update to new role
    roleList = "" //work in progress
};

function addRole(){ //name, salary, department

    function salaryvalid() {
        //DECIMAL. CODE to verify or convert to this.
    };

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

    inquirer.prompt(question).then(function (data) {
        //add code to add into database. 
    });
};



function addDepartment(){
    const question = "What is the name of the new Department?";
    inquirer.prompt(question).then(function (data) {
        //add code to add into database. 
    });
};

 
function menuInput(input){

    //add code to pull database of department & roles & manager & salary

    switch (input){
        case "Add Employee":
            addEmployee();
            break;
        case "Update Employee Role":
            updateEmployeeRole();
            break;
        case "View All Roles":
            viewAllRoles();
            break;
        case "Add Role":
            addRole();
            break;
        case "View All Departments":
            viewAllDepartments();
            break;
        case "Add Department":
            addDepartment();
            break;
        default:
            return 0;
            break;
    };
};

module.exports = {
menuInput
};