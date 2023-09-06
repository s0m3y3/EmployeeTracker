INSERT INTO department (name)
VALUES ("Sales"),
       ("Finance"),
       ("Legal"),
       ("Engineer"),
       ("Office");

INSERT INTO role (title, salary, department)
VALUES ("Sales Lead", 75000, 1),
       ("Salesperson", 50000,1),
       ("Account Manager", 90000, 2),
       ("Accountant", 100000,2),
       ("Legal Team Lead", 150000, 3),
       ("Lawyer", 100000,3),
       ("Lead Engineer", 125000,4),
       ("Software Engineer", 80000,4),
       ("Data Scientist", 145000,4),       
       ("Secretary", 90000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("John", "Smith", 1,NULL),
       ("Johnson","Moore", 2,1),
       ("Ashley", "Brown",3, NULL),
       ("Mai", "Taylor", 4, 3) ,
       ("Emma", "Clark", 5, NULL),
       ("Will", "William", 6, 5),
       ("James","Jones", 7, NULL),
       ("Ava","Jones", 8,6),
       ("Olivia","Williams", 9, NULL),
       ("Ethan","Anderson", 10, NULL);

