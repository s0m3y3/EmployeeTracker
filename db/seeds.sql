INSERT INTO department (name)
VALUES ("Web Development"),
       ("Data Science"),
       ("Math"),
       ("Electives");

INSERT INTO role (title, salary, department)
VALUES ("Sales Lead", 75000, "Sales"),
       ("Salesperson", 50000,"Sales"),
       ("Account Manager", 90000, "Finance"),
       ("Accountant", 100000,"Finance"),
       ("Legal Team Lead", 150000, "Legal"),
       ("Lawyer", 100000,"Legal"),
       ("Lead Engineer", 125000,"Engineer"),
       ("Software Engineer", 80000,"Engineer"),
       ("Data Scientist", 145000,"Engineer"),       
       ("Secretary", 90000, "Office");

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("John", "Smith", 1,NULL),
       ("Johnson","Moore", 2,"John Smith"),
       ("Ashley", "Brown",3, NULL),
       ("Mai", "Taylor", 4, "Ashley Brown") ,
       ("Emma", "Clark", 5, NULL),
       ("Will", "William", 6, "Emma Clark"),
       ("James","Jones", 7, NULL),
       ("Ava","Jones", 8,"James Jones"),
       ("Olivia","Williams", 9, NULL),
       ("Ethan","Anderson", 10, NULL);

