INSERT INTO department (name)
    VALUES
        ("Technology"),
        ("Strategy"),
        ("Change Management"),
        ("Project Managemnt");
    

INSERT INTO role (title, salary, department_id)
    VALUES
        ("Analyst", 100000,1),
        ("Consultant",150000,1), 
        ("Sr. Consultant",200000,1),
        ("Manager",250000,1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
    VALUES
        ('Bob',   'Smith', 1, 1),
        ('Susan', 'Jones', 2,  2),
        ('Morty', 'Scott', 3, 3),
        ('Ralph', 'Baggins', 4, 1);
