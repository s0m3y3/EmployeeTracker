INSERT INTO department (name)
VALUES ("Web Development"),
       ("Data Science"),
       ("Math"),
       ("Electives");

INSERT INTO role (title, salary, department)
VALUES ("Sales Lead", 75000, "Sales"),
       ("Salesperson", 50000,"Sales"),
       ("Account Manager", 3, "Finance"),
       ("Accountant", 100000,"Finance"),
       ("Legal Team Lead", 150000, "Legal"),
       ("Lawyer", 100000,"Legal"),
       ("Software Engineer", 80000,"Engineer"),
       ("Lead Engineer", 125000,"Engineer"),
       ("Data Scientist", 145000,"Engineer"),       
       ("Secretary", 90000, "Office"),

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("John", "Smith", 1,10),
       ("Johnson","Moore", 2),
       ("Ashley", "Brown",3),
       ("Mai", "Zone", 4),
       ("Machine", 4),
       ("Game", 1 ),
       ("Cloud", 1);
       