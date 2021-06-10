const mysql = require('mysql');
const inquirer = require('inquirer');
const cTable = require("console.table");
const { isBuffer } = require('util');

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
                'View all departments',
                'View all roles',
                'View all employees',
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
                case 'View all departments':
                    viewDepartment();
                    break;
                case 'View all roles':
                    viewRole();
                    break;
                case 'View all employees':
                    viewEmployee();
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


const viewRole = () => {
    inquirer
        .prompt({
            name: 'view_role',
            type: 'confirm',
            message: 'View all roles?'
        })
        .then((answer) => {
            connection.query('SELECT title FROM allEmployees', function (err, results, fields) {
                if(err) throw err;
                console.table(results);
                manageDB();
            });
        });
};

const viewEmployee = () => {
    inquirer
        .prompt({
            name: 'view_empoyee',
            type: 'confirm',
            message: 'View all employees?'
        })
        .then((answer) => {
            connection.query('SELECT first_name, last_name FROM allEmployees', function (err, results, fields) {
                if(err) throw err;
                console.table(results);
                manageDB();
            });
        });
};