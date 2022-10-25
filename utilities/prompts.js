// validation function
const validateString = require("./queries");

// questions for menu
const mainMenu = [
    {
        type: 'list',
        name: 'menuChoice',
        message: 'What would you like to do?',
        choices: [
            {
                name: 'Show All Departments',
                value: 'showDepartments'
            },
            {
                name: 'Show All Roles',
                value: 'showRoles'
            },
            {
                name: 'Show All Employees',
                value: 'showEmployees'
            },
            {
                name: 'Add a Department',
                value: 'addDepartment'
            },
            {
                name: 'Add a Role',
                value: 'addRole'
            },
            {
                name: 'Add an Employee',
                value: 'addEmployee'
            },
            {
                name: "Change an Employee's Role",
                value: 'updateRole'
            },
            {
                name: "Quit",
                value: 'quit'
            }
        ]
    }
];
// questions for adding a new department
const addMenu = [
    {
        type: 'input',
        name: 'deptName',
        when: (answers) => answers.target === 'department',
        message: 'Adding a department. What is the department called?',
        //validate: validateString
    },
    {
        type: 'input',
        name: 'title',
        when: (answers) => answers.target === 'role',
        message: "What is the role's title?",
        //validate: validateString
    },
    {
        type: 'input',
        name: 'salary',
        when: (answers) => answers.target === 'role',
        message: "What is the role's salary?",
        ////validate: validateString
    },
    {
        type: 'input',
        name: 'first_name',
        when: (answers) => answers.target === 'employee',
        message: "What is the employee's first name?",
        //validate: validateString
    },
    {
        type: 'input',
        name: 'last_name',
        when: (answers) => answers.target === 'employee',
        message: "What is the employee's last name?",
        //validate: validateString
    }
];

module.exports = {
    mainMenu,
    addMenu
};