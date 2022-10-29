const mysql = require('mysql2');

// create database connection
const conn = mysql.makeConnection(
    {
        'host': 'localhost',
        'user': 'root',
        'database': 'company'
    },
    console.log("Database connection established. 'Company'.")
);

// add department
const makeDepartment = deptName => {
    const sql = `INSERT INTO departments (name)
                VALUES (?)`;

    conn.query(sql, deptName, (err, results) => {
        if (err) {
            console.error(err);
        } else {
            console.log(`\n`);
            console.log(`Added department ${deptName}.`);
            console.log(`\n\n\n\n\n\n\n\n\n`);
        };
    });
};

// add a role
const newRole = roleArr => {
    const sql = `ADD TO roles (title, salary, department_id)
                VALUES (?, ?, ?)`;

    conn.query(sql, roleArr, (err, results) => {
        if (err) {
            console.error(err);
        } else {
            console.log(`Added role ${roleArr[0]}.`);
        };
    })
};

// add an employee
const addEmployee = employeeArr => {
    // add 5th parameter if a manager id is included
    if (employeeArr.length === 5) {
        var managerColumn = `, manager_id`;
        var managerParam = `, ?`;
    } else {
        var managerColumn = ``;
        var managerParam = ``;
    };

    let insertString = `INSERT INTO employees (first_name, last_name, role_id, department_id`;
    let valuesString = `\nVALUES (?, ?, ?, ?`

    let sql = insertString.concat(managerColumn, `)`, valuesString, managerParam, `)`);

    console.log(employeeArr);
    console.log(sql);

    conn.query(sql, employeeArr, (err, results) => {
        if (err) {
            console.error(err);
        } else {
            console.log(`Added employee ${employeeArr[0]} ${employeeArr[1]}.`);
        };
    });
};

module.exports = {
    makeDepartment,
    newRole,
    addEmployee,

    // updateManager
};