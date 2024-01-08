DROP DATABASE IF EXISTS employeeData_db;
CREATE DATABASE employeeData_db;

USE employeeData_db;

CREATE TABLE department (
id INT NOT NULL,
name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
  id INT NOT NULL,
  title VARCHAR(30) NOT NULL,
  salary decimal NOT NULL,
  department_id INT NOT NULL
);

CREATE TABLE employee (
  id INT NOT NULL,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT NOT NULL,
  manager_id INT NOT NULL
);
