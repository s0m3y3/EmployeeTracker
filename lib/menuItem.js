const inquirer = require("inquirer");
const { performDatabaseQueries, addDatabaseQueries, updateEmployee_role} = require('../server.js');

let departmentList =[];
let managerList =[1,2,3];

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

function viewAllDepartments(){
    performDatabaseQueries('viewAllDepartments',(results)=>
    console.table(results));
};

function viewAllRoles(){
    performDatabaseQueries('viewAllRoles',(results)=>
    console.table(results));
};

function updateEmployeeRole(){
    //update to new role
    roleList = "" //work in progress
    updateEmployee_role(); //run query. work in progress
};

async function addEmployee(){ 

    performDatabaseQueries('departmentOnly', (results) => {
        const departmentList = results.map((row) => row.name);
        console.log("1: ", departmentList);
      });

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
        console.log(data);
        addDatabaseQueries('addEmployee', data);
    });
};

function addRole(){ //name, salary, department

    //valid salary input. 
    function salaryvalid(input) {
        const decimalPattern = /^[+]?[0-9]*(?:\.[0-9]+)?$/; //regrex. Number must be positive, 0-9. Okay with decimal. 

        // Test failed.
        if (!decimalPattern.test(input)) { 
            return console.log("This is not a decimal number.");
        }; 

        const roundedValue = parseFloat(input).toFixed(2); //Round to 2 decimal places
        return roundedValue;
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

    // inquirer.prompt(question).then(function (data) {
    //     //add code to add into database. 
    // });
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

    const question = [
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

    const data = await inquirer.prompt(question);
    console.log(data, " & ", typeof data)
    addDatabaseQueries('addEmployee', data);
}


async function menuInput(input){
    //add code to pull database of department & roles & manager & salary
    // console.log(input, typeof input)
    switch (input){
        case "Add Employee":
            console.log("Add Employee: ");
            addEmployee();
            break;
        case "Update Employee Role":
            console.log("Update Employee Role: ");
            // updateEmployeeRole();
            break;
        case "View All Roles":
            console.log("View All Roles: ");
            viewAllRoles();
            break;
        case "Add Role":
            console.log("Add Role: completed");
            // addRole();
            break;
        case 'View All Departments':
            viewAllDepartments();
            // note to self: Need to remove index. Otherwise, finished.
            break;
        case "Add Department":
            console.log("Add Department: ");
            // addDepartment();
            break;
        // default:
        //     return;
    };

};

module.exports = {
menuInput
};