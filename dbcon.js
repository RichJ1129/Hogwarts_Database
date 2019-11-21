var mysql = require('mysql');
var aws = require('aws-sdk');

var con = mysql.createConnection({
    connectionLimit : 10,
    host            : process.env.host,
    user            : process.env.user,
    password        : process.env.password,
    database        : process.env.database
});

con.connect((err) => {
    if(err){
        console.log('Error connecting to Db');
        return;
    }
    console.log('Connection established');
});

module.exports.pool = con;
