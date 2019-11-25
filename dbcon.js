
var mysql = require('mysql');
// var aws = require('aws-sdk');

var con = mysql.createPool({
    connectionLimit : 10,
    host            : 'classmysql.engr.oregonstate.edu',
    user            : 'cs340_speciale',
    password        : '6105',
    database        : 'cs340_speciale'
});

module.exports.pool = con;