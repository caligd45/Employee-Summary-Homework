const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const teamMembers = []
const arrayID = []

function appMenu (){

    function createManager (){
        console.log("Please create your new team!")
        inquirer.prompt([{
            type:"input", 
            name:"managerName",
            message:"What managers name?",
            validate: answer => {
                if (answer !== ""){
                    return true;
                }
                return "Please enter the managers name."
            } 
        },{
            type:"input",
            name:"managerId",
            message:"What is the managers Id?",
            validate: answer => {
                const pass = answer.match(
                    /^[1-9]\d*$/
                );
                if (pass) {
                    return true;
                }
                return "Please enter a valid id.";
            }
        },
            {type:"input",
            name:"managerEmail",
            message:"What is the managers email?",
            validate: answer => {
                const pass = answer.match(
                    /\S+@\S+\.\S+/
                );
                if (pass) {
                    return true;
                }
                return "Please enter a valid email address.";
            }

        },
        {
            type:"input",
            name:"managerOfficeNumber",
            message:"What is the managers office number?",
            validate: answer => {
                const pass = answer.match(
                    /^[1-9]\d*$/
                );
                if (pass) {
                    return true;
                }
                return "Please enter a valid phone number.";
            }
        }]).then(answers => {
            const manager = new Manager (answers.managerName, answers.managerId, answers.managerEmail, answers.managerOfficeNumber)
            teamMembers.push(manager) 
            arrayID.push(answers.managerId)
            createTeam ()
        })
    }

    function createTeam (){
        inquirer.prompt([{
            type:"list",
            name:"memberChoice",
            message:"What type of team member would you like to add?",
            choices:["Intern", "Engineer", "No more team members for you!"]
        }]).then(userChoice => {
            switch (userChoice.memberChoice){
                case "Intern":
                    addIntern ();
                    break;
                case "Engineer":
                    addEngineer ();
                    break;
                default: 
                buildTeam();
            }
        })
    }
    //Add Intern will go here
    function addIntern (){
        inquirer.prompt([{
            type:"list",
            name:"internName",
            message:"What is the interns name?",
            validate: answer => {
                if (answer !== ""){
                    return true;
                }
                return "Please enter the interns name."
            }
        },{
            type:"list",
            name:"internId",
            message:"What is the interns Id?",
            validate: answer => {
                const pass = answer.match(
                    /^[1-9]\d*$/
                );
                if (pass) {
                    return true;
                }
                return "Please enter a valid id."
            }
        },{
            type:"list",
            name:"internEmail",
            message:"What is the interns email?",
            validate: answer => {
                const pass = answer.match(
                    /\S+@\S+\.\S+/
                );
                if (pass) {
                    return true;
                }
                return "Please enter a valid email address."
            }
        },{
            type:"list",
            name:"internSchool",
            message:"What school did the intern attend?",
            validate: answer => {
                if (answer !=="") {
                    return true;
                }
                return "Please enter the school name."
            }
        }
    ]).then (answers => {
        const intern = new Intern (answers.internName, answers.internId, answers.internEmail, answers.internSchool)
        teamMembers.push(intern)
        arrayID.push(answers.internId)
        createTeam ()
    })
    }
    //Add Engineer will go here

    function addEngineer (){
        inquirer.prompt([{
            type:"list",
            name:"engineerName",
            message:"What is your engineers name?",
            validate: answer => {
                if (answer !=="") {
                    return true;
                }
                return "Please enter the engineers name.";
            }
        },{
            type:"list",
            name:"engineerId",
            message:"What is your engineers Id?",
            validate: answer => {
                const pass = answer.match(
                    /^[1-9]\d*$/
                );
                if (pass) {
                    return true;
                }
                return "Please enter valid id.";
            }
        },{
            type:"list",
            name:"engineerEmail",
            message:"What is your engineers email?",
            validate: answer => {
                const pass = answer.match(
                    /\S+@\S+\.\S+/
                );
                if (pass) {
                    return true;
                }
                return "Please enter a valid email address";
            }
        },{
            type:"list",
            name:"engineerGithub",
            message:"What is your engineers Github username?",
            validate: answer => {
                if (answer !=="") {
                    return true;
                }
                return "Please enter valid username."
            }
        }
    ]).then (answers => {
        const engineer = new Engineer (answers.engineerName, answers.engineerId, answers.engineerEmail, answers.engineerGithub)
        teamMembers.push(engineer)
        arrayID.push(answers.engineerId)
        createTeam ()
    })
    }
    
    
    function buildTeam (){
        if (!fs.existsSync(OUTPUT_DIR)){
            fs.mkdirSync(OUTPUT_DIR)
        }
        fs.writeFileSync(outputPath, render(teamMembers), "utf-8")
    }
    createManager();
}
    appMenu();


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
