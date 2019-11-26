
var mysql = require('mysql');
var aws = require('aws-sdk');

var con = mysql.createPool({
    connectionLimit : 10,
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