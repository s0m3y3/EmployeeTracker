const fs = require('fs');
const inquirer = require("inquirer");

const menuItems = [
    "Add Employee",
    "Update Employee Role",
    "View All Roles",
    "Add Role",
    "View All Departments",
    "Add Department"
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

//function that writes to to file.
function writeToFile(fileName, data) {
    fs.writeFile(fileName,data,err => {if(err){console.error(err); return}})
}

//function to initialize app
function init() {
    inquirer.prompt(questions).then(function (data) {
       
        if(data===menuItems[0]){

        }
        else if (data=== menuItems[1]){

        }

    });
    init();
}

init(); 