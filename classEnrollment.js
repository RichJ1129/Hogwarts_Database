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
        context.jsscripts = ["filterClass.js", "deleteStudentFromClass.js"];
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

    router.delete('/:cID/_/:sID', function(req, res){
        console.log(req.params.sID);
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM student_class WHERE student_class.student = ? AND student_class.class = ?";
        var inserts = [req.params.sID, req.params.cID];
        console.log(inserts);

        sql = mysql.pool.query(sql, inserts, function(err, result, fields){
            if(err){
                console.log(err);
                res.write(JSON.stringify(err));
                res.status(400);
                res.end();
            }else{
                res.status(202);
                console.log("DELETE CONFIRMED");
                res.end();
            }
        });
    });


    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = { title: 'Hogwart\'s HeadMaster Database' };
        context.jsscripts = ["filterClass.js", "deleteStudentFromClass.js"];
        var mysql = req.app.get('mysql');
        getClasses(res, mysql, context, done);
        getStudentByClass(req,res, mysql, context, done);
        function done(){
            callbackCount++;
            if(callbackCount >= 2){
                res.render('classEnrollment',context);
            }
        }});
    return router;
}();