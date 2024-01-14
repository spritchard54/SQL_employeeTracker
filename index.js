const { table } = require('table')
const express = require('express')
const inquirer = require('inquirer')
const app = express();
const createConnection = require('./db/envConnect')
const questions = [
  {
    type: 'list',
    name: 'questionOne',
    message: 'What do you want to do.',
    choices: [
      ' View all departments',
      ' View all roles',
      ' View all employees',
      new inquirer.Separator(),
      ' Add a department',
      ' Add a role',
      ' Add an employee',
      new inquirer.Separator(),
      ' Update an employee role',
      new inquirer.Separator(),]
      , default: ''
  }]
let db = null;
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

inquirer
  .prompt(questions).then((answers) => {
    // console.log(answers);
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });

async function init() {
  // connects to the database/ use await to wait for connection to finish
  db = await createConnection();
  // console.log(`Connected to the SP employee_db database.`);
  // console.log(db);

  // app.get('/api/UPDATE', (req, res) => {
  //   db.query('SELECT * FROM employeeData', function (err, data) {
  //     console.log(data);
  //     res.json(data);
  //   });
  // });

  // // use prepared_statement
  // const objInput = {
  //   // must match database column and values
  //   name: "Nelson"
  // }
  // const idata = await db.query("INSERT INTO island SET ?", objInput)
  // const results = await db.query("SELECT * FROM island;");

  // // get data from results;
  // const data = results[0];
  // console.log(data);

  // // table module
  // const arrOfArr = data.map(row => Object.values(row));
  // // add column names
  // arrOfArr.unshift(["id", "name"]);
  // // print table
  // console.log(table(arrOfArr));
}
init();