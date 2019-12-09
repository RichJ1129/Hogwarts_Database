
var mysql = require('mysql');
var aws = require('aws-sdk');

var con = mysql.createPool({
    connectionLimit : 10,
    connectionTimeout: 60*60*1000,
    acquireTimeout  : 60*60*1000,
    timeout         : 60*60*1000,
    host            : 'classmysql.engr.oregonstate.edu',
    user            : 'cs340_josephri',
    password        : '1233',
    database        : 'cs340_josephri'
});


// var con = mysql.createPool({
//     connectionLimit : 10,
//     host            : process.env.host,
//     user            : process.env.user,
//     password        : process.env.password,
//     database        : process.env.database
// });

module.exports.pool = con;
