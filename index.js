const inquirer = require("inquirer");
const {menuInput} = require('./lib/menuItem.js');

//function to initialize app
async function init() {
    const menu = [
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
            choices: menu
        },
    ];
    const data = await inquirer.prompt(questions);
    if (data.text==="Quit"){return console.log("Goodbye-");};  //exit function, if Quit is selected. 
    await menuInput(data.text);  //input prompt into menuInput, which is the file logic of the code. 
};

init();

module.exports = {
    init
    };