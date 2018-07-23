var mysql = require('mysql');
var credentials = require('./../../config.js');
var fs = require('fs');

module.exports = connection = mysql.createConnection({
    host: credentials.host,
    user: credentials.user,
    password: credentials.password,
    database: credentials.database
})

// module.exports = connection = mysql.createConnection({
//     host: credentials.host,
//     user: credentials.user,
//     password: credentials.password,
//     database: credentials.database,
//     ssl: {
//         ca: fs.readFileSync(__dirname + '/../build/database/rds-combined-ca-bundle.pem')
//     }
// })