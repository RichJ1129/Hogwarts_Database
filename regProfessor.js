module.exports = function(){
    var express = require('express');
    var router = express.Router();

    router.get('/', function(req, res, next) {
        res.render('regProfessor', { title: 'Hogwart\'s HeadMaster Database' });
    });

    router.post('/', function(req, res){
        console.log("Adding Professor");
        console.log(req.body);

        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO professor (professor.first_name, professor.last_name, professor.school, professor.house) VALUES (?,?,?,?);";

        var inserts = [req.body.fName, req.body.lName, req.body.school, req.body.house];

        sql = mysql.pool.query(sql, inserts, function(err, results, fields){
            if(err){
                console.log(err);
                res.write(JSON.stringify(err));
                res.end();
            }else{
                console.log(inserts);
                res.redirect('/viewProfessor');
            }
        });
    });
    return router;
}();