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
                name: 'view All Departments',
                value: 'showDepartments'
            },
            {
                name: 'view All Roles',
                value: 'showRoles'
            },
            {
                name: 'view All Employees',
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
        message: 'Adding a department. Name of Department?',
        //validate: validateString
    },
    {
        type: 'input',
        name: 'title',
        when: (answers) => answers.target === 'role',
        message: "What is the title for this role?",
        //validate: validateString
    },
    {
        type: 'input',
        name: 'salary',
        when: (answers) => answers.target === 'role',
        message: "What is the salar for this role?",
        ////validate: validateString
    },
    {
        type: 'input',
        name: 'first_name',
        when: (answers) => answers.target === 'employee',
        message: "Enter employee's first name?",
        //validate: validateString
    },
    {
        type: 'input',
        name: 'last_name',
        when: (answers) => answers.target === 'employee',
        message: "Employee's last name?",
        //validate: validateString
    }
];

module.exports = {
    mainMenu,
    addMenu
};