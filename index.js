//this is main system of Employee Tracker. 
const inquirer = require("inquirer");
const {menuInput} = require('./lib/menuItem.js');
require('dotenv').config();

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
        choices: menuItems
    },
];

//function to initialize app
async function init() {
    const data = await inquirer.prompt(questions);
    if (data.text==="Quit"){return;};  //exit function, if Quit is selected. 
    await menuInput(data.text);  //input prompt into menuInput, which is the logic of the code. 
    setTimeout(init, 500);   
}

init(); 