const mysql = require('mysql2');

// Conn database
const conn = mysql.createConnection(
    {
        'host': 'localhost',
        'user': 'root',
        'database': 'company'
    },
    console.log("Database connection established. Using database 'company'.")
);

// add department
const addDepartment = deptName => {
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
const addRole = roleArr => {
    const sql = `INSERT INTO roles (title, salary, department_id)
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

// update an employee role
const updateRole = roleUpdateArr => {
    const sql = `UPDATE employees
                SET role_id = ?
                WHERE id = ?`;

    conn.query(sql, roleUpdateArr, (err, results) => {
        if (err) {
            console.error(err);
        } else {
            console.log(`Changed employee's role.`);
        };
    });
};
module.exports = {
    addDepartment,
    addRole,
    addEmployee,
    updateRole
    // updateManager
};