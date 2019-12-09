module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getPets(res, mysql, context, done){
        mysql.pool.query("SELECT pet_id as id, name FROM pet", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.pets = results;
            done();
        });
    }
    router.get('/', function(req, res, next) {
        var callbackCount = 0;
        var context = { title: 'Hogwart\'s HeadMaster Database' };
        var mysql = req.app.get('mysql');
        getPets(res,mysql,context,done);
        function done(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('regStudent', context);
            }
        }});

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