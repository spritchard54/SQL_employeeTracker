const { table } = require('table')
const PORT = process.env.PORT || 3001
const mysql = require('mysql2/promise')
const express = require('express')
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

let db = null;

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
  console.log(`Connected to the employee_db database.`);
  console.log(db);

  app.get('/api/UPDATE', (req, res) => {
    db.query('SELECT * FROM employeeData', function (err, data) {
      console.log(data);
      res.json(data);
    });
  });

  // TODO use inquirer if you want

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