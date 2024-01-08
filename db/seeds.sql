INSERT INTO department (id, name)
    VALUES
        ( ,"Technology"),
        ( ,"Strategy");
    

INSERT INTO role (id, title, salary, department_id)
    VALUES
        ( , "Analyst", 100000,  ),
        ( , "Consultant", 150000, ), 
        ( , "Sr. Consultant", 200000, ),
        ( , "Manager", 250000, );

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
    VALUES
        (1, "Bob", "Smith", "Analyst", 10),
        (2, "Susan", "Jones", "Consultant", 11),
        (3, "Morty", "Scott", "Sr. Consultant", 12);
