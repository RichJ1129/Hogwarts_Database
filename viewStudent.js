module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getStudents(res, mysql, context, done){
        var sql = 'SELECT student.student_id as sID, first_name as fname, last_name as lname, age AS ageStudent, school.name as stuSchool, house.name as stuHouse, pet.name as stuPet, wand.core as stuWand FROM student\n' +
            'JOIN school ON student.school = school.school_id\n' +
            'JOIN house ON student.house = house.house_id\n' +
            'LEFT JOIN pet ON student.pet = pet.pet_id\n' +
            'LEFT JOIN wand ON student.wand = wand.wand_id;';
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
    function getStudent(res, mysql, context, id, complete){
        var sql = "SELECT student_id as id, first_name, last_name, age, school, house, pet, wand FROM student WHERE student_id = ?";
        var inserts = [id];
        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.student = results[0];
            complete();
        });
    }

    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = { title: 'Hogwart\'s HeadMaster Database' };
        context.jsscripts = ["deleteStudent.js"];
        var mysql = req.app.get('mysql');
        getStudent(res,mysql, context, done);
        function done(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('viewStudent',context);
            }
        }
    });

    router.get('/:id', function(req, res){
        callbackCount = 0;
        var context = {};
        context.jsscripts = ["selectSchool.js", "selectHouse.js", "selectPet.js", "selectWand.js", "updateStudent.js"];
        var mysql = req.app.get('mysql');
        getStudent(res, mysql, context, req.params.student_id, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('update-person', context);
            }

        }
    });

    router.put('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        console.log(req.body)
        console.log(req.params.id)
        var sql = "UPDATE student SET first_name=?, last_name=?, age=?, school=?, pet=?, wand=? WHERE student_id=?";
        var inserts = [req.body.first_name, req.body.last_name, req.body.age, req.body.school, req.body.house, req.body.pet, req.body.wand, req.params.student_id];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(error)
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.status(200);
                res.end();
            }
        });
    });
    
    return router;
}();