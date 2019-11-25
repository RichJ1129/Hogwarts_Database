module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getStudentClass(res, mysql, context, done){
        var sql = 'SELECT s.first_name as fname, s.last_name as lname, c.name as class, p.last_name as professor FROM student_class as sc\n' +
            'JOIN student AS s ON sc.student_id = s.student_id\n' +
            'JOIN class AS c ON sc.class_id = c.class_id\n' +
            'JOIN professor AS p ON c.professor_id=p.professor_id\n' +
            'WHERE s.student_id = :studentID_Dropdown OR c.class_id = :classID_Dropdown;';
        mysql.pool.query(sql,
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

    function getStudents(res, mysql, context, done){
        var sql = 'SELECT * FROM student;';
        mysql.pool.query(sql,
            function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.student = results;
            console.log(context.student);
            done();
        });
    }

    function getClasses(res, mysql, context, done){
        var sql = 'SELECT * FROM class;';
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

    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = { title: 'Hogwart\'s HeadMaster Database' };
        context.jsscripts = ["dropClass.js"];
        var mysql = req.app.get('mysql');
        getStudents(res, mysql, context, done);
        getClass(res, mysql, context, done);
        getStudentClass(res, mysql, context, done);
        function done(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('classEnrollment',context);
            }
        }});
    return router;
}();