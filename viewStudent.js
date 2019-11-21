module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getStudent(res, mysql, context, done){
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
        }});
    return router;
}();