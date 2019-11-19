var mysql = require('mysql');
var aws = require('aws-sdk');

var con = mysql.createConnection({
    connectionLimit : 10,
    host            : 'classmysql.engr.oregonstate.edu',
    user            : process.env.user,
    password        : process.env.password,
    database        : 'cs340_josephri'
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