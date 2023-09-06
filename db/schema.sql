DROP DATABASE IF EXISTS employeeTracker_db;
CREATE DATABASE employeeTracker_db;

USE employeeTracker_db;

CREATE TABLE Department (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30) NOT NULL
);

CREATE TABLE Role (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL not null,
  department INT,
  FOREIGN KEY (department)
  REFERENCES department(id)
  ON DELETE SET NULL
);

CREATE TABLE Employee (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id int not null,
  manager_id INT UNIQUE,
  FOREIGN KEY (role_id)
  REFERENCES role(id)
  ON DELETE CASCADE
);

