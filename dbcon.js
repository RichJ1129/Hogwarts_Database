var mysql = require('mysql');
var aws = require('aws-sdk');

var con = mysql.createConnection({
    connectionLimit : 10,
    host            : process.env.database,
    user            : process.env.user,
    password        : process.env.pw,
    database        : process.env.database
});

con.connect((err) => {
    if(err){
        console.log('Error connecting to Db');
        return;
    }
    console.log('Connection established');
});

// con.end((err) => {
//     // The connection is terminated gracefully
//     // Ensures all previously enqueued queries are still
//     // before sending a COM_QUIT packet to the MySQL server.
// });

module.exports.pool = con;