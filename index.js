// import { table } from 'table';
// const data = []
// console.log(table(data))
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

// menu function
async function menu() {
  menuChoices = [
    "View all departments",
    "View all roles",
    "View all employees",
    "Add a department",
    "Add a role",
    "Add an employee",
    "Update an employee's role",
    "Update an employee's manager",
    "View employees by manager",
    "View employees by department",
    "Delete a department",
    "Delete a role",
    "Delete an employee",
    "View the total utilized budget of a department",
    "Exit",
  ];
  const answers = await inquirer.prompt([
    {
      type: "list",
      message: "What would you like to do?",
      name: "option",
      //calls array from menu function
      choices: menuChoices,
    },
  ]);

  //The switch statement evaluates an expression, matching the expression's value against a series of case clauses, and executes statements after the first case clause with a matching value, until a break statement is encountered. The default clause of a switch statement will be jumped to if no case matches the expression's value.

  switch (answers.option) {
    // If the user seclect "View all Departments", the run the viewDepartments function.
    case menuChoices[0]:
      return viewDepartments();
    case menuChoices[1]:
      return viewRoles();
    case menuChoices[2]:
      return viewEmployees();
    case menuChoices[3]:
      return addDepartment();
    case menuChoices[4]:
      return addRole();
    case menuChoices[5]:
      return addEmployee();
    case menuChoices[6]:
      return updateEmployeeRole();
    case menuChoices[7]:
      return updateEmployeeManager();
    case menuChoices[8]:
      return viewEmployeeByManager();
    case menuChoices[9]:
      return viewEmployeeByDepartment();
    case menuChoices[10]:
      return deleteDepartment();
    case menuChoices[11]:
      return deleteRole();
    case menuChoices[12]:
      return deleteEmployee();
    case menuChoices[13]:
      return viewTotalBudget();
    case menuChoices[14]:
      return exit();
  }
}

// function to view all Departments
async function viewDepartments() {
  const [depData, value] = await db.query(
    "SELECT id AS department_id, name AS department_name FROM department"
  );
  // brings us back to the menu
  return await menu();
}
// function to view all Departments
async function viewRoles() {
  const [roleData, value] =
    await db.query(`SELECT role.id, title, salary, department.name AS deparment_name
  FROM role 
  LEFT JOIN department ON role.department_id = department.id`);
  return await menu();
}
// function to view all Departments
async function viewEmployees() {
  const [empData, value] = await db.query(
    `SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, " ", manager.last_name) AS manager 
    FROM employee 
    LEFT JOIN role ON employee.role_id = role.id 
    LEFT JOIN department ON role.department_id = department.id 
    LEFT JOIN employee AS manager ON employee.manager_id = manager.id`
  );
  return await menu();
}
// function to add a department
async function addDepartment() {
  // stores user answer from the prompt
  const answers = await inquirer.prompt([
    {
      type: "input",
      // name matches the column you're trying to populate or fill
      name: "name",
      message: "Enter the name of the department do you want to add",
    },
  ]);
  // sql query with error handling
  const inputData = await db.query(
    "INSERT INTO department SET ?", answers, (err, results) => {
      if (err) throw err;
      console.error(err);
    }
  );
  return await menu();
}
// function to add a role
async function addRole() {
  // departmentData is the list of rows / objects
  // metaData contains data types for the columns
  // destructuring simplifies the return code
  const [departmentData, metaData] = await db.query(
    "SELECT id, name FROM department"
  );
  // creating a key-value pair for id and name
  // this array is also used as the list of multiple choices prompted to the user in the list type questions
  const departmentChoices = departmentData.map((row) => ({
    name: row.name,
    value: row.id,
  }));

  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "title",
      message: "What role do you want to add?",
    },
    {
      type: "input",
      name: "salary",
      message: "What is the salary for this role?",
    },
    {
      type: "list",
      name: "department_id",
      message: "What department does this role belong to?",
      choices: departmentChoices,
    },
  ]);

  const inputData = await db.query(
    "INSERT INTO role SET ?",
    answers,
    (err, results) => {
      if (err) throw err;
      console.error(err);
    }
  );
  console.log(inputData);

  console.log("Insert Sucessful\n\n\n\n");
  return await menu();
}
// function to add a employee
async function addEmployee() {
  const [roleData, metaData] = await db.query("SELECT title, id FROM role");
  // creates a key-value pair between title and id from the role's table
  const roleChoices = roleData.map((row) => ({
    name: row.title,
    value: row.id,
  }));
  const [managerData, managerMetaData] = await db.query(
    "SELECT first_name, last_name, id FROM employee"
  );
  // creating a no manger option with a value of null to add to the array of choices
  const nullValue = { name: "None", value: null };
  // concatenating the first_name and last_name values
  // creating a key-value pair between manager's name and id from the employee table
  const managerChoices = managerData.map((row) => ({
    name: row.first_name + " " + row.last_name,
    value: row.id,
  }));
  managerChoices.unshift(nullValue);
  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "first_name",
      message: "What is the first name of the employee?",
    },
    {
      type: "input",
      name: "last_name",
      message: "What is the last name of the employee?",
    },
    {
      type: "list",
      name: "role_id",
      message: "What is the role of the employee?",
      choices: roleChoices,
    },
    {
      type: "list",
      name: "manager_id",
      message: "Who is the employee's manager?",
      choices: managerChoices,
    },
  ]);

  const inputData = await db.query(
    "INSERT INTO employee SET ?", answers,(err, results) => {
      if (err) throw err;
      console.error(err);
    }
  );
  return await menu();
}
// function to update an employee's role
async function updateEmployeeRole() {
  const [empData, employeeMetaData] = await db.query(
    "SELECT first_name, last_name, id FROM employee"
  );
  const employeeChoices = empData.map((row) => ({
    name: row.first_name + " " + row.last_name,
    value: row.id,
  }));
  const [roleData, value] = await db.query("SELECT title, id FROM role");
  const roleChoices = roleData.map((row) => ({
    name: row.title,
    value: row.id,
  }));
  const answers = await inquirer.prompt([
    {
      type: "list",
      name: "id",
      message: "Which employee do you want to update?",
      choices: employeeChoices,
    },
    {
      type: "list",
      name: "role_id",
      message: "Which role do you want to assign the employee?",
      choices: roleChoices,
    },
  ]);

  // saving sql query and parameter under variables to pass multiple values into a query
  const sql = "UPDATE employee SET role_id = ? WHERE id = ? ";
  const sqlParams = [answers.role_id, answers.id];

  const inputData = await db.query(sql, sqlParams, (err, results) => {
    if (err) throw err;
    console.error(err);
  });
  return await menu();
}
// function to update an employee's manager
async function updateEmployeeManager() {
  const [empData, employeeMetaData] = await db.query(
    "SELECT first_name, last_name, id, manager_id FROM employee"
  );
  // creating an array of objects with key-value pairs for name, id, and manager id
  const employeeChoices = empData.map((row) => ({
    name: row.first_name + " " + row.last_name,
    value: row.id,
    manager: row.manager_id,
  }));
  const answers = await inquirer.prompt([
    {
      type: "list",
      name: "id",
      message: "Which employee do you want to update?",
      choices: employeeChoices,
    },
    {
      type: "list",
      name: "manager_id",
      message: "Which manager do you want to assign the employee?",
      choices: employeeChoices,
    },
  ]);
  const sql = "UPDATE employee SET manager_id = ? WHERE id = ? ";
  const sqlParams = [answers.manager_id, answers.id];
  const inputData = await db.query(sql, sqlParams, (err, results) => {
    if (err) throw err;
    console.error(err);
  });
  return await menu();
}
// views employees by manager
async function viewEmployeeByManager() {
  console.log("Viewing Employees by Manager");
  const [empData, employeeMetaData] = await db.query(
    `SELECT CONCAT(manager.first_name, " ", manager.last_name) AS manager, employee.id, employee.first_name, employee.last_name 
    FROM employee 
    LEFT JOIN role ON employee.role_id = role.id 
    LEFT JOIN department ON role.department_id = department.id 
    LEFT JOIN employee AS manager ON employee.manager_id = manager.id
    WHERE employee.manager_id IS NOT NULL
    ORDER BY manager`
  );
  console.table(empData);
  return await menu();
}
// view employees by department
async function viewEmployeeByDepartment() {
  const [empData, employeeMetaData] = await db.query(
    `SELECT department.name as department, employee.id, employee.first_name, employee.last_name
    FROM employee 
    LEFT JOIN role ON employee.role_id = role.id 
    LEFT JOIN department ON role.department_id = department.id
    ORDER BY department.name`
  );
  console.table(employeeData);
  return await menu();
}
// function to delete a department
async function deleteDepartment() {
  console.log("Deleting Department");
  const [depData, metaData] = await db.query("SELECT * FROM department");
  const depChoices = depData.map((row) => ({
    name: row.name,
    value: row.id,
  }));
  const answers = await inquirer.prompt([
    {
      type: "list",
      name: "id",
      message: "What department do you want to delete?",
      choices: depChoices,
    },
  ]);

  const inputData = await db.query(
    "DELETE FROM department WHERE id = ?",
    answers.id,
    (err, results) => {
      if (err) throw err;
      console.error(err);
    }
  );

  return await menu();
}
// function to delete a role
async function deleteRole() {
  const [roleData, metaData] = await db.query("SELECT title, id FROM role");
  const roleChoices = roleData.map((row) => ({
    name: row.title,
    value: row.id,
  }));
  const answers = await inquirer.prompt([
    {
      type: "list",
      name: "id",
      message: "What role do you want to delete?",
      choices: roleChoices,
    },
  ]);

  const inputData = await db.query(
    "DELETE FROM role WHERE id = ?",
    answers.id,
    (err, results) => {
      if (err) throw err;
      console.error(err);
    }
  );
  console.log(inputData);

  console.log("Delete Sucessful\n\n\n\n");
  return await menu();
}
// function to delete an employee
async function deleteEmployee() {
  console.log("Deleting Employeee");
  const [empData, metaData] = await db.query(
    "SELECT first_name, last_name, id FROM employee"
  );
  const empChoices = empData.map((row) => ({
    name: row.first_name + " " + row.last_name,
    value: row.id,
  }));
  const answers = await inquirer.prompt([
    {
      type: "list",
      name: "id",
      message: "What role do you want to delete?",
      choices: empChoices,
    },
  ]);

  const inputData = await db.query(
    "DELETE FROM employee WHERE id = ?",
    answers.id,
    (err, results) => {
      if (err) throw err;
      console.error(err);
    }
  );
  console.log(inputData);
  return await menu();
}
// view employees by department
async function viewTotalBudget() {
  console.log("Viewing Total Budget");
  const [depData, metaData] = await db.query("SELECT * FROM department");
  const depChoices = depData.map((row) => ({
    name: row.name,
    value: row.id,
  }));

  const answers = await inquirer.prompt([
    {
      type: "list",
      name: "id",
      message: "What department do you want to view the budget for?",
      choices: depChoices,
    },
  ]);

  const [totalBudgetData, metaBudgetData] = await db.query(
    `SELECT department.name as department, SUM(role.salary) AS total_budget
    FROM employee 
    LEFT JOIN role ON employee.role_id = role.id 
    LEFT JOIN department ON role.department_id = department.id 
    WHERE department.id = ?`,
    answers.id
  );

  console.table(totalBudgetData);
  return await menu();
}
// exit function
async function exit() {
  process.exit();
}
async function init() {
  // connects to the database/ use await to wait for connection to finish
  db = await createConnection();
  // console.log(`Connected to the SP employee_db database.`);
 await menu();

}
init();