/* Drop the data base if it exists so you don't duplicate it */
DROP DATABASE IF EXISTS employeeData_db;
/* Create the database. */
CREATE DATABASE employeeData_db;

/* Determine which data base to use with the commands below */
USE employeeData_db;

/* Creates a table with columns 'id' and 'name' */
CREATE TABLE department (
/* parameters for the column follow the name of the column.  */
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL,
  /* Comes from department table */
  department_id INT NOT NULL,
  /* department_id - found in this table (role)... */
  FOREIGN KEY (department_id)
  /* Should match 'id' column found in 'department table' */
  REFERENCES department(id) 
  ON DELETE CASCADE
);

CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT NULL,
  manager_id INT NULL,
  FOREIGN KEY (role_id)
  REFERENCES role(id)
  ON DELETE SET NULL
  ON UPDATE CASCADE,
  FOREIGN KEY (manager_id)
  REFERENCES employee(id)
  ON DELETE SET NULL
  ON UPDATE CASCADE
);
