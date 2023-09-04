const fs = require('fs');
const inquirer = require("inquirer");
const MenuItems = require('./lib/menuItem');

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
    console.log('Employee Manager');
    if(data==="Quit"){return ;}; //if "Quit" selected, exit function. 

    inquirer.prompt(questions).then(function (data) {
       MenuItems(data);
    });

    init();
}

init(); 