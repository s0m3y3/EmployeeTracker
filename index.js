//this is main system of Employee Tracker. 
const inquirer = require("inquirer");
const menuInput = require('./lib/menuItem');

const menuItems = [
    "Add Employee",
    "Update Employee Role",
    "View All Roles",
    "Add Role",
    "View All Departments",
    "Add Department",
    "Quit"
];

//Array of questions for user input
const questions = [
    {
        type:"list",
        name:"text",
        message: "What would you like to do?",
        validate: menuItems
    },
];

//function to initialize app
function init() {
    inquirer.prompt(questions).then(function (data) {  
        menuInput(data);  //all user input is put into this module, function.
        // if (data==="Quit"){return 1;};
    });

    init(); //if "Quit" is not selected, then loop this function.
}

init(); 