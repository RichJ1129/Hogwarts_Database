module.exports = function(){
    var express = require('express');
    var router = express.Router();

    router.get('/', function(req, res, next) {
        res.render('regStudent', { title: 'Hogwart\'s HeadMaster Database' });
    });

    router.post('/', function(req, res){
        console.log("Adding Student");
        console.log(req.body);

        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO student (student.first_name, student.last_name, student.age, student.school, student.house) VALUES (?, ?,?,?,?);";

        var inserts = [req.body.fName, req.body.lName, req.body.age, req.body.school, req.body.house];

        sql = mysql.pool.query(sql, inserts, function(err, results, fields){
            if(err){
                console.log(err);
                res.write(JSON.stringify(err));
                res.end();
            }else{
                console.log(inserts);
                res.redirect('/viewStudent');
            }
        });
    });
    return router;
}();