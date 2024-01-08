const { table } = require('table')
const PORT = process.env.PORT || 3001
const mysql = require('mysql2/promise')
const express = require('express')
const app = express();
const inquirer = require('inquirer')
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
const questions = [
  {
    type: 'list',
    name: 'questionOne',
    message: 'What do you want to do.',
    choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add and employee', 'Update an employee role'],
    default: ''
  },
]


inquirer
.prompt(questions)
.then((answers) => {
console.log(answers);
})
.catch((error) => {
  if (error.isTtyError) {
    // Prompt couldn't be rendered in the current environment
  } else {
    // Something else went wrong
  }
});


// let db = null;

const init = async () => {
  db = await mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // TODO: Add MySQL password
      password: 'rootroot',
      database: 'employeeData_db'
    }
  );


  // console.log(`Connected to the employee_db database.`);
  // console.log(db);

  // app.get('/api/UPDATE', (req, res) => {
  //   db.query('SELECT * FROM employeeData', function (err, data) {
  //     console.log(data);
  //     res.json(data);
  //   });
  // });



  // use prepared_statement
  // const objInput = {
  //   // must match database column and values
  //   name: "Nelson"
  // }
  // const idata = await db.query("INSERT INTO island SET ?", objInput)

  //   const results = await db.query("SELECT * FROM island;");

  //   // get data from results;
  //   const data = results[0];
  //   console.log(data);

  //   // table module
  //   const arrOfArr = data.map( row => Object.values(row));
  //   // add column names
  //   arrOfArr.unshift(["id", "name"]);
  //   // print table
  //   console.log(table(arrOfArr));
}
init();