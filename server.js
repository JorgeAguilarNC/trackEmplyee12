const mysql = require('mysql2/promise');
const cTable = require('console.table');
const inquirer = require('inquirer');

// get questions from prompts.js
const {
    mainMenu,
    addMenu } = require('./utils/prompts');

// get query functions from queries.js
const {
    showDepartments,
    showRoles,
    showEmployees } = require('./utils/queries');

const {
    addDepartment,
    addRole,
    addEmployee,
    updateRole } = require('./utils/sync_queries');

    // prompt user
const promptMenu = () => {
    return inquirer
        .prompt(mainMenu)
        .then(promptData)
        // gets and returns data needed for action
        .then(dbAction)
         // performs selected action
        .then((response) => {
             // loops back to main menu
            if (response) {
                return promptMenu();
            };
        })
        .catch(err => {
            console.log(err);
        });
};

// get user input needed to perform selected action
async function promptData(selection) {
    // Connect to database
    const db = await mysql.createConnection(
        {
            'host': 'localhost',
            'user': 'root',
            'database': 'company'
        },
        console.log("Database connection established. Using database 'company'.")
    );

    // if the user selected 'Quit", close the app
    if (selection.menuChoice === 'quit') {
        process.exit();
    };

    // create an array for the list selection questions
    let chooseMenu = [];

    //  get the departments list if needed
    if (selection.menuChoice === 'addRole' || selection.menuChoice === 'addEmployee') {
        // get department list
        let deptChoices = [];

        var sql = `SELECT
        name AS Department,
        id AS ID
        FROM departments`;

        const [rows, fields] = await db.execute(sql);
        let depts = rows;

        // create array of department names and ids
        for (i = 0; i < depts.length; i++) {
            let obj = {
                name: depts[i].Department,
                value: depts[i].ID
            };

            deptChoices.push(obj);
        };

        // department_id question to array
        chooseMenu.push({
            type: 'list',
            name: 'department_id',
            message: "Please choose the corresponding department.",
            choices: deptChoices
        });
    };

    //  the employees list
    if (selection.menuChoice === 'addEmployee' || selection.menuChoice === 'updateRole') {

        //  list of employees
        let empChoices = [];

        var sql = `SELECT
        CONCAT(first_name, " ", last_name) AS Employee,
        id AS ID
        FROM employees`;

        const [rows, fields] = await db.execute(sql);
        let emps = rows;

        // create array of employee names and ids
        for (i = 0; i < emps.length; i++) {
            let obj = {
                name: emps[i].Employee,
                value: emps[i].ID
            };

            empChoices.push(obj);
        };

        // add employee id
        if (selection.menuChoice === 'addEmployee') {
            //  'no manager' option
            let noManagerObj = {
                name: 'This employee has no manager.',
                value: 'none'
            };

            empChoices.push(noManagerObj);

            chooseMenu.push(
                {
                    type: 'list',
                    name: 'manager_id',
                    message: "Please choose the employee's manager.",
                    choices: empChoices
                }
            );
        } else if (selection.menuChoice === 'updateRole') {
            chooseMenu.push(
                {
                    type: 'list',
                    name: 'employee_id',
                    message: "Which employee would you like to update?",
                    choices: empChoices
                }
            );
        };
    };

    //  get the roles list
    if (selection.menuChoice === 'addEmployee' || selection.menuChoice === 'updateRole') {
        // get list of roles
        let roleChoices = [];

        var sql = `SELECT
        title AS Role,
        id AS ID
        FROM roles`;

        const [rows, fields] = await db.execute(sql);
        let roles = rows;

        // create  titles and id
        for (i = 0; i < roles.length; i++) {
            let obj = {
                name: roles[i].Role,
                value: roles[i].ID
            };

            roleChoices.push(obj);
        };

        // chooseMenu role
        chooseMenu.push(
            {
                type: 'list',
                name: 'role_id',
                message: "Please select the appropriate role.",
                choices: roleChoices
            }
        );
    };

    // combine Menu
    const actionMenu = addMenu.concat(chooseMenu);


    // get user input
    switch (selection.menuChoice) {
        case 'showDepartments':
            var action = {
                type: 'show',
                target: 'departments'
            };
            return action;

        case 'showRoles':
            var action = {
                type: 'show',
                target: 'roles'
            };
            return action;

        case 'showEmployees':
            var action = {
                type: 'show',
                target: 'employees'
            };
            return action;

        case 'addDepartment':
            var action = {
                type: 'add',
                target: 'department'
            };

            return inquirer
                .prompt(actionMenu, action)
                .then(answers => {
                    return answers;
                })
                .catch(err => {
                    console.log(err);
                });

        case 'addRole':
            var action = {
                type: 'add',
                target: 'role'
            };

            return inquirer
                .prompt(actionMenu, action)
                .then(answers => {
                    return answers;
                })
                .catch(err => {
                    console.log(err);
                });

        case 'addEmployee':
            var action = {
                type: 'add',
                target: 'employee'
            };

            return inquirer
                .prompt(actionMenu, action)
                .then(answers => {
                    return answers;
                })
                .catch(err => {
                    console.log(err);
                });

        case 'updateRole':
            var action = {
                type: 'update',
                target: 'employee role'
            };

            return inquirer
                .prompt(actionMenu, action)
                .then(answers => {
                    return answers;
                })
                .catch(err => {
                    console.log(err);
                });
    };
};

// execute database
const dbAction = action => {
    if (action.type === 'show') {
        switch (action.target) {
            case 'departments':
                showDepartments();
                return true;
            case 'roles':
                showRoles();
                return true;
            case 'employees':
                showEmployees();
                return true;
        };
    };

    if (action.type === 'add') {
        switch (action.target) {
            case 'department':
                addDepartment(action.deptName);
                return true;

            case 'role':
                var array = [
                    action.title,
                    action.salary,
                    action.department_id
                ];
                addRole(array);
                return true;

            case 'employee':
                var array = [
                    action.first_name,
                    action.last_name,
                    action.role_id,
                    action.department_id
                ];

                if (action.manager_id !== 'none') {
                    array.push(action.manager_id);
                };
                addEmployee(array);
                return true;
        };
    };

    if (action.type === 'update') {
        const array = [
            action.role_id,
            action.employee_id
        ];
        updateRole(array);
        return true;
    };
};

// initialize appn
promptMenu();