const { Pool } = require('pg');
const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'employee_tracker',
    password: '7758',
    port: 5432,
});

function startApp() {
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

function viewAllDepartments() {
    pool.query('SELECT * FROM department', (err, res) => {
        if (err) {
            console.error('Error fetching departments:', err);
            startApp();
            return;
        }
        console.table(res.rows);
        startApp();
    });
}

function viewAllRoles() {
    pool.query('SELECT * FROM role', (err, res) => {
        if (err) {
            console.error('Error fetching roles:', err);
            startApp();
            return;
        }
        console.table(res.rows);
        startApp();
    });
}

function viewAllEmployees() {
    pool.query('SELECT * FROM employee', (err, res) => {
        if (err) {
            console.error('Error fetching employees:', err);
            startApp();
            return;
        }
        console.table(res.rows);
        startApp();
    });
}

function addDepartment() {
    inquirer
        .prompt({
            type: 'input',
            name: 'name',
            message: 'Enter the name of the department:'
        })
        .then(answer => {
            pool.query('INSERT INTO department(name) VALUES($1)', [answer.name], (err, res) => {
                if (err) {
                    console.error('Error adding department:', err);
                } else {
                    console.log('Department added successfully!');
                }
                startApp();
            });
        });
}

function addRole() {
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
            pool.query('INSERT INTO role(title, salary, department_id) VALUES($1, $2, $3)', [answer.title, answer.salary, answer.department_id], (err, res) => {
                if (err) {
                    console.error('Error adding role:', err);
                } else {
                    console.log('Role added successfully!');
                }
                startApp();
            });
        });
}

function addEmployee() {
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
            pool.query('INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES($1, $2, $3, $4)', [answer.first_name, answer.last_name, answer.role_id, answer.manager_id], (err, res) => {
                if (err) {
                    console.error('Error adding employee:', err);
                } else {
                    console.log('Employee added successfully!');
                }
                startApp();
            });
        });
}

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
            pool.query(
                'UPDATE employee SET role_id = $1 WHERE id = $2',
                [answer.new_role_id, answer.employee_id],
                (err, res) => {
                    if (err) {
                        console.error('Error updating employee role:', err);
                    } else {
                        console.log('Employee role updated successfully!');
                    }
                    startApp();
                }
            );
        });
}

// Read and execute schema.sql file
const schemaPath = path.join(__dirname, '..', 'db', 'schema.sql');
fs.readFile(schemaPath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading schema.sql:', err);
        return;
    }
    pool.query(data, (err, res) => {
        if (err) {
            console.error('Error executing schema.sql:', err);
            return;
        }
        console.log('Schema created successfully!');
        startApp();
    });
});
