DROP TABLE IF EXISTS employee;

-- Drop the role table if it exists
DROP TABLE IF EXISTS role;

-- Drop the department table if it exists, along with its dependent objects
DROP TABLE IF EXISTS department CASCADE;


-- Create the department table
CREATE TABLE department (
    id SERIAL PRIMARY KEY,
    name VARCHAR(30)
);

-- Drop the role table if it exists
DROP TABLE IF EXISTS role;

-- Create the role table
CREATE TABLE role (
    id SERIAL PRIMARY KEY,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT REFERENCES department(id)
);

-- Drop the employee table if it exists
DROP TABLE IF EXISTS employee;

-- Create the employee table
CREATE TABLE employee (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT REFERENCES role(id),
    manager_id INT REFERENCES employee(id)
); 
