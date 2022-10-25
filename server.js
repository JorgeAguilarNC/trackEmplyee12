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