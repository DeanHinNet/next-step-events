var mysql = require('mysql');
var credentials = process.env.credentials;

if(credentials === undefined) {
    credentials = require('./../config.js');
} else {
    credentials = {
        host: process.env.host,
        user: process.env.user,
        password: process.env.password,
        database: process.env.database
    }
}

module.exports = connection = mysql.createConnection({
    host: credentials.host,
    user: credentials.user,
    password: credentials.password,
    database: credentials.database
})