// get connection
const mysql = require('mysql2/promise');

// validate user input
const validateString = (input) => {
    if (!input) {
        console.log('Please enter a name.');
        return false;
    } else if (input.includes(';')) {
        console.log('Please do not include semi-colons.');
        return false;
    } else if (input.includes('--')) {
        console.log('Please do not include double dashes.');
    } else {
        return true;
    };
};
-A