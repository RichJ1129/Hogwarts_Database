module.exports = function(){
    var express = require('express');
    var router = express.Router();


    function getStudents(res, mysql, context, done){
        var sql = 'SELECT student.student_id as sID, student.first_name as fname, student.last_name as lname, age AS ageStudent, school.name as stuSchool, house.name as stuHouse, pet.name as stuPet FROM student\n' +
            'JOIN school ON student.school = school.school_id\n' +
            'JOIN house ON student.house = house.house_id\n' +
            'LEFT JOIN pet ON student.pet = pet.pet_id;';
        mysql.pool.query(sql,
            function(error, results, fields){
                if(error){
                    res.write(JSON.stringify(error));
                    res.end();
                }
                context.students = results;
                console.log(context.students);
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

    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = { title: 'Hogwart\'s HeadMaster Database' };
        context.jsscripts = [];
        var mysql = req.app.get('mysql');
        getStudents(res,mysql, context, done);
        getClasses(res, mysql, context, done);
        function done(){
            callbackCount++;
            if(callbackCount >= 2){
                res.render('enrollStudent',context);
            }
        }});

    router.post('/', function(req, res){
        console.log("Adding Student");
        console.log(req.body);

        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO student_class(student_class.student, student_class.class) VALUES (?,?);";

        var inserts = [req.body.sID, req.body.cID];
        console.log(inserts);

        sql = mysql.pool.query(sql, inserts, function(err, results, fields){
            if(err){
                console.log(err);
                res.write(JSON.stringify(err));
                res.end();
            }else{
                console.log(inserts);
                res.redirect('/classEnrollment');
            }
        });
    });

    return router;
}();