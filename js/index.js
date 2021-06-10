const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require("console.table");

const connection = mysql.createConnection({
    host: 'localhost',
    PORT: 3001,
    user: 'root',
    password: 'stavesacre',
    database: 'company_db'
});

const manageDB = () => {
    inquirer
        .prompt({
            name: 'action',
            type: 'list',
            message: 'What would you like to do?',
            choices: [
                'Add a department',
                'Add a role',
                'Add an employee',
                'View a department',
                'View a role',
                'View an employee',
                'Update a department',
                'Update a role',
                'Update an employee',
                'Delete a department',
                'Delete a role',
                'Delete an employee',
                'View total budget',
                'View budget by department',
                'View budget by role',
                'Exit',
            ],
        })
        .then((answer) => {
            switch (answer.action) {
                case 'Add a department':
                    addDepartment();
                    break;
                case 'Add a role':
                    addRole();
                    break;
                case 'Add an employee':
                    addEmployee();
                    break;
                case 'View a department':
                    viewDepartment();
                    break;
                case 'View a role':
                    viewRole();
                    break;
                case 'View an employee':
                    viewEmployee();
                    break;
                case 'Update a department':
                    updateDepartment();
                    break;
                case 'Update a role':
                    updateRole();
                    break;
                case 'Update an employee':
                    updateEmployee();
                    break;
                case 'Delete a department':
                    deleteDepartment();
                    break;
                case 'Delete a role':
                    deleteRole();
                    break;
                case 'Delete an employee':
                    deleteEmployee();
                    break;
                case 'View total budget':
                    totalBudget();
                    break;
                case 'View budget by department':
                    departmentBudget();
                    break;
                case 'View budget by role':
                    roleBudget();
                    break;
                case 'Exit':
                    connection.end();
                    break;
                default:
                    console.log(`Invalid: ${answer.action}`);
                    break;
            }
        });
};

connection.connect((err) => {
    if (err) throw err;
    manageDB();
});

const addDepartment = () => {
    inquirer
        .prompt({
            name: 'department',
            type: 'input',
            message: 'New Department Name?'
        })
        .then((answer) => {
            const query = 'INSERT INTO allEmployees (department) VALUES (?)';
            connection.query(query, [answer.department], (err, res) => {
                if (err) throw err;
                manageDB();
            });
        });
};

const addRole = () => {
    inquirer
        .prompt({
            name: 'role',
            type: 'input',
            message: 'New Role Name?'
        })
        .then((answer) => {
            const query = 'INSERT INTO allEmployees (title) VALUES (?)';
            connection.query(query, [answer.title], (err, res) => {
                if (err) throw err;
                manageDB();
            });
        });
};

const addEmployee = () => {
    inquirer
        .prompt([
            {
                name: 'first_name',
                type: 'input',
                message: 'New Employee\'s First Name?'
            },
            {
                name: 'last_name',
                type: 'input',
                message: 'New Employee\'s Last Name?'
            },
            {
                name: 'title',
                type: 'input',
                message: 'New Employee\'s Title?'
            },
            {
                name: 'department',
                type: 'input',
                message: 'New Employee\'s Department?'
            },
            {
                name: 'salary',
                type: 'input',
                message: 'New Employee\'s Salary?'
            },
            {
                name: 'manager',
                type: 'input',
                message: 'New Employee\'s Manager?'
            }])
        .then((answer) => {
            const query = 'INSERT INTO allEmployees (first_name, last_name, title, department, salary, manager) VALUES (?,?,?,?,?,?)';
            connection.query(query, [answer.first_name, answer.last_name, answer.title, answer.department, answer.salary, answer.manager] , (err, res) => {
                if (err) throw err;
                manageDB();
            });
        });
};

const viewDepartment = () => {
    inquirer
        .prompt({
            name: 'view_dept',
            type: 'confirm',
            message: 'View all departments?'
        })
        .then((answer) => {
            connection.query('SELECT department FROM allEmployees', function (err, results, fields) {
                if(err) throw err;
                console.table(results);
            });
            manageDB();
        });
};


// const viewRole = () => {};

// const viewEmployee = () => {};

// const updateDepartment = () => {};

// const updateRole = () => {};

// const updateEmployee = () => {};

// const deleteDepartment = () => {};

// const deleteRole = () => {};

// const deleteEmployee = () => {};

// const totalBudget = () => {};

// const departmentBudget = () => {};

// const roleBudget = () => {};