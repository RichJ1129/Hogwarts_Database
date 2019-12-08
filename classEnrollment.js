module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getStudentByClass(req, res, mysql, context, done){
        var sql = "SELECT student.first_name as fname, student.last_name as lname, class.name as cName, professor.last_name as professor FROM student_class\n" +
            "JOIN student ON student_class.student = student.student_id\n" +
            "JOIN class ON student_class.class = class.class_id\n" +
            "JOIN professor ON class.professor = professor.professor_id WHERE student_class.class = ?;";
        console.log(req.params);
        var inserts = [req.params.class];
        console.log(inserts);
        mysql.pool.query(sql, inserts,
            function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.student_class = results;
            console.log(context.student_class);
            done();
        });
    }

    function getClasses(res, mysql, context, done){
        var sql = 'SELECT class.class_id as cID, name FROM class;';
        mysql.pool.query(sql,
            function(error, results, fields){
                if(error){
                    res.write(JSON.stringify(error));
                    res.end();
                }
                context.class = results;
                console.log(context.class);
                done();
            });
    }

    router.get('/filter/:class', function(req, res){
        console.log("HI");
        var callbackCount = 0;
        var context = { title: 'Hogwart\'s HeadMaster Database' };
        context.jsscripts = ["filterClass.js"];
        var mysql = req.app.get('mysql');
        getStudentByClass(req,res, mysql, context, done);
        getClasses(res, mysql, context, done);
        function done(){
            callbackCount++;
            if(callbackCount >= 2){
                res.render('classEnrollment', context);
            }

        }
    });


    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = { title: 'Hogwart\'s HeadMaster Database' };
        context.jsscripts = ["filterClass.js"];
        var mysql = req.app.get('mysql');
        getClasses(res, mysql, context, done);
        function done(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('classEnrollment',context);
            }
        }});
    return router;
}();