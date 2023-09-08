const inquirer = require("inquirer");
const {menuInput} = require('./lib/menuItem.js');
const inquirerRecursive = require("inquirer-recursive");
inquirer.registerPrompt("recursive", inquirerRecursive);

//Array of questions for user input
const questions = [
    {
        type:"list",
        name:"text",
        message: "What would you like to do?",
        choices: [
            "Add Employee",
            "Update Employee Role",
            "View All Roles",
            "Add Role",
            "View All Departments",
            "Add Department",
            "Quit"
        ]
    },
];

//function to initialize app
async function init() {
    const data = await inquirer.prompt(questions); //.then pass callback method??
    if (data.text==="Quit"){return console.log("Goodbye-");} //exit function, if Quit is selected. 
    await menuInput(data.text);  //input prompt into menuInput, which is the file logic of the code. 
    // async()=> await init();
};
// init();

function intro(){
console.log("Welcome to Employee Tracker");
init();
}

intro();
