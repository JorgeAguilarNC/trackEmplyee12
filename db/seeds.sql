INSERT INTO departments (name)
VALUES
    ('Accounting'),
    ('IT'),
    ('Administration');

INSERT INTO roles (title, salary, department_id)
VALUES
    ('Accounting Technician', 100000, 1),
    ('Accounting Manager', 150000, 1),
    ('IT Analyst', 100000, 2),
    ('IT Manager', 150000, 2),
    ('C.F.O.', 200000, 3),
    ('C.T.O.', 200000, 3),
    ('C.E.O.', 250000, 3),
    ('Intern', 60000, 2);

INSERT INTO employees (first_name, last_name, role_id, manager_id, department_id)
VALUES
    ('Alma', 'Rodriguez', 7, NULL, 3),
    ('Marcos', 'Fernandes', 5, 1, 3),
    ('Karen', 'Jefferson', 6, 1, 3),
    ('Carolyn', 'Dawes', 2, 2, 1),
    ('Maya', 'Erwin', 1, 4, 1),
    ('Bob', 'Hall', 4, 3, 2),
    ('Doug', 'Cohen', 3, 6, 2),
    ('Darwin', 'Manek', 8, 6, 2);