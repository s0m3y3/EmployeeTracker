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
    console.log('Employee Manager');

    let quit = inquirer.prompt(questions).then(function (data) {
        menuInput(data);
        if (data==="Quit"){return 1;};
    });

    if(quit==="1"){return;}; //if "Quit" selected, exit function. 

    init();
}

init(); 