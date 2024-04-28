-- seed info to seed the database with test values.

-- departments.
INSERT INTO department (name) VALUES
  ('Engineering'),
  ('Marketing'),
  ('Finance'),
  ('Human Resources'),
  ('Sales'),
  ('Customer Service');

-- roles.
INSERT INTO role (title, salary, department_id) VALUES
  ('Software Engineer', 80000, 1),
  ('Marketing Manager', 90000, 2),
  ('Financial Analyst', 75000, 3),
  ('HR Specialist', 70000, 4),
  ('Sales Representative', 85000, 5),
  ('Customer Service Manager', 78000, 6);

-- employees.
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
  ('Austin', 'Allen', 1, NULL),
  ('Breno', 'Rocha', 2, 1),
  ('Priscilla', 'Johnson', 3, 1),
  ('Emily', 'Smith', 4, 1),
  ('David', 'Miller', 5, 2),
  ('Jessica', 'Davis', 6, 3);
