const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const employeeTypes = ["Manager", "Engineer", "Intern"];
const employees= [];


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

function addEmployee(){
  inquirer    
      .prompt([
          {
              type: 'list',
              message: "What type of employee would you like to add?",
              choices: employeeTypes,
              name: 'employee',
          },
      ]).then(data =>{
          switch(data.employee){
              case("Manager"):
                  addManager()
                  break;            
              case("Engineer"):
                  addEngineer()
                  break;            
              case("Intern"):
                  addIntern()
                  break;
          }
      });
}

function addManager(){
  console.log("Manager");
  inquirer    
      .prompt([
          {
              type: "input",
              message: "Whats the name of your manager?",
              name: "name",
          },
          {
              type: "input",
              message: "Whats the managers Id number?",
              name: "id",
          },
          {
              type: "input",
              message: "Whats the managers email? (ex. email@email.com)",
              name: "email",
          },
          {
              type: "input",
              message: "Whats the managers office number?",
              name: "office",
          },
      ]).then(data =>{
          if(!checkGeneralInfo(data) || !checkOfficeNumber(data.office))
          {
              addManager();
          }
          else{
              employees.push(new Manager(data.name, data.id, data.email, data.office));
              finish();
          }
      });
}

function addEngineer(){
  console.log("Engineer");
  inquirer    
      .prompt([
          {
              type: "input",
              message: "Whats the name of your engineer?",
              name: "name",
          },
          {
              type: "input",
              message: "Whats the engineers Id number?",
              name: "id",
          },
          {
              type: "input",
              message: "Whats the engineers email? (ex. email@email.com)",
              name: "email",
          },
          {
              type: "input",
              message: "Whats the engineers github username?",
              name: "github",
          },
      ]).then(data =>{
          if(!checkGeneralInfo(data) || !checkGithubUsername(data.github))
          {
              addEngineer();
          }
          else{
              employees.push(new Engineer(data.name, data.id, data.email, data.github));
              finish();
          }

      });
}

function addIntern(){
  console.log("Intern");
  inquirer    
      .prompt([
          {
              type: "input",
              message: "Whats the name of your intern?",
              name: "name",
          },
          {
              type: "input",
              message: "Whats the interns Id number?",
              name: "id",
          },
          {
              type: "input",
              message: "Whats the interns email? (ex. email@email.com)",
              name: "email",
          },
          {
              type: "input",
              message: "What school is the intern attending?",
              name: "school",
          },
      ]).then(data =>{
          if(!checkGeneralInfo(data) || !checkSchool(data.school))
          {
              addIntern();
          }
          else{
              employees.push(new Intern(data.name, data.id, data.email, data.school));
              finish();
          }
      });
}

function finish()
{
  inquirer
      .prompt([
          {
              type: "confirm",
              message: "Would you like to add another employee?",
              name: "confirmation",
          }
      ]).then(data => {
          if(data.confirmation){
              addEmployee();
          }
          else{
              fs.writeFile(outputPath, render(employees), 'utf8',  (err) => err ? console.error(err) : console.log('Success! Team page created!'));
          }
      })
}

function checkGeneralInfo(data){
  if(!data.name)
  {
      console.error("\x1b[31m", "Please enter a valid name.");
      return false;
  }
  if(!data.id || isNaN(data.id)){
      console.error("\x1b[31m", "Please enter a valid id.");
      return false;
  }
  if(!validateEmail(data.email))
  {
      console.error("\x1b[31m", "Please enter a valid email.");
      return false;
  }
  return true;
}

function checkOfficeNumber(num){
  if(isNaN(num)){
      console.error("\x1b[31m", "Please enter a valid office number.");
      return false;
  }
  return true;
}

function checkGithubUsername(user){
  if(!user){
      console.error("\x1b[31m", "Please enter a valid Github username.");
      return false;
  }
  return true;
}

function checkSchool(school){
  if(!school){
      console.error("\x1b[31m", "Please enter a valid school.");
      return false;
  }
  return true;
}

function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

addEmployee();





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
