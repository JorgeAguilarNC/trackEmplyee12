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