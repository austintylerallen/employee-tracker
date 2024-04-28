const { Pool } = require('pg');
const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');

// Create a PostgreSQL connection pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'employee_tracker',
    password: '7758',
    port: 5432,
});

// Function to start the application
function startApp() {
    // Display menu options
    inquirer
        .prompt({
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: [
                'View all departments',
                'View all roles',
                'View all employees',
                'Add a department',
                'Add a role',
                'Add an employee',
                'Update an employee role',
                'Exit'
            ]
        })
        .then(answer => {
            // Handle user choice
            switch (answer.action) {
                case 'View all departments':
                    viewAllDepartments();
                    break;
                case 'View all roles':
                    viewAllRoles();
                    break;
                case 'View all employees':
                    viewAllEmployees();
                    break;
                case 'Add a department':
                    addDepartment();
                    break;
                case 'Add a role':
                    addRole();
                    break;
                case 'Add an employee':
                    addEmployee();
                    break;
                case 'Update an employee role':
                    updateEmployeeRole();
                    break;
                case 'Exit':
                    pool.end();
                    console.log('Goodbye!');
                    break;
            }
        });
}

// Function to view all departments
function viewAllDepartments() {
    // Query database to get all departments
    pool.query('SELECT * FROM department', (err, res) => {
        if (err) {
            console.error('Error fetching departments:', err);
            return startApp();
        }
        // Display departments
        console.table(res.rows);
        // Continue with the app
        startApp();
    });
}

// Function to view all roles
function viewAllRoles() {
    // Query database to get all roles
    pool.query('SELECT * FROM role', (err, res) => {
        if (err) {
            console.error('Error fetching roles:', err);
            return startApp();
        }
        // Display roles
        console.table(res.rows);
        // Continue with the app
        startApp();
    });
}

// Function to view all employees
function viewAllEmployees() {
    // Query database to get all employees
    pool.query('SELECT * FROM employee', (err, res) => {
        if (err) {
            console.error('Error fetching employees:', err);
            return startApp();
        }
        // Display employees
        console.table(res.rows);
        // Continue with the app
        startApp();
    });
}

// Function to add a department
function addDepartment() {
    // Prompt user for department name
    inquirer
        .prompt({
            type: 'input',
            name: 'name',
            message: 'Enter the name of the department:'
        })
        .then(answer => {
            // Insert new department into the database
            pool.query('INSERT INTO department(name) VALUES($1)', [answer.name], (err, res) => {
                if (err) {
                    console.error('Error adding department:', err);
                    return startApp();
                }
                console.log('Department added successfully!');
                // Continue with the app
                startApp();
            });
        });
}

// Function to add a role
function addRole() {
    // Prompt user for role details
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'title',
                message: 'Enter the title of the role:'
            },
            {
                type: 'input',
                name: 'salary',
                message: 'Enter the salary for the role:'
            },
            {
                type: 'input',
                name: 'department_id',
                message: 'Enter the department ID for the role:'
            }
        ])
        .then(answer => {
            // Insert new role into the database
            pool.query('INSERT INTO role(title, salary, department_id) VALUES($1, $2, $3)', [answer.title, answer.salary, answer.department_id], (err, res) => {
                if (err) {
                    console.error('Error adding role:', err);
                    return startApp();
                }
                console.log('Role added successfully!');
                // Continue with the app
                startApp();
            });
        });
}

// Function to add an employee
function addEmployee() {
    // Prompt user for employee details
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'first_name',
                message: 'Enter the first name of the employee:'
            },
            {
                type: 'input',
                name: 'last_name',
                message: 'Enter the last name of the employee:'
            },
            {
                type: 'input',
                name: 'role_id',
                message: 'Enter the role ID for the employee:'
            },
            {
                type: 'input',
                name: 'manager_id',
                message: 'Enter the manager ID for the employee:'
            }
        ])
        .then(answer => {
            // Insert new employee into the database
            pool.query('INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES($1, $2, $3, $4)', [answer.first_name, answer.last_name, answer.role_id, answer.manager_id], (err, res) => {
                if (err) {
                    console.error('Error adding employee:', err);
                    return startApp();
                }
                console.log('Employee added successfully!');
                // Continue with the app
                startApp();
            });
        });
}

// Function to update an employee role
function updateEmployeeRole() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'employee_id',
                message: 'Enter the ID of the employee you want to update:'
            },
            {
                type: 'input',
                name: 'new_role_id',
                message: 'Enter the ID of the new role for the employee:'
            }
        ])
        .then(answer => {
            // Update employee role in the database
            pool.query(
                'UPDATE employee SET role_id = $1 WHERE id = $2',
                [answer.new_role_id, answer.employee_id],
                (err, res) => {
                    if (err) {
                        console.error('Error updating employee role:', err);
                        return startApp();
                    }
                    console.log('Employee role updated successfully!');
                    // Continue with the app
                    startApp();
                }
            );
        });
}

// Read the schema.sql file and create database tables
const schemaPath = path.join(__dirname, '..', 'db', 'schema.sql');
fs.readFile(schemaPath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading schema.sql:', err);
        return;
    }
    // Execute the SQL commands to create database tables
    pool.query(data, (err, res) => {
        if (err) {
            console.error('Error executing schema.sql:', err);
            return;
        }
        console.log('Schema created successfully!');
        // Start the application after creating the schema
        startApp();
    });
});
