module.exports = function(){
    var express = require('express');
    var router = express.Router();


    function getProfessor(res, mysql, context, done){
        var sql = "SELECT professor.professor_id as pID, first_name as fname, last_name as lname, school.name as profSchool, house.name as profHouse, pet.name as profPet, wand.core as profWand FROM professor\n" +
            "LEFT JOIN school ON professor.school = school.school_id\n" +
            "LEFT JOIN house ON professor.house = house.house_id\n" +
            "LEFT JOIN pet ON professor.pet = pet.pet_id\n" +
            "LEFT JOIN wand ON professor.wand = wand.wand_id;";
        mysql.pool.query(sql,
            function(error, results, fields){
                if(error){
                    res.write(JSON.stringify(error));
                    res.end();
                }
                context.professor = results;
                console.log(context.professor);
                done();
            });
    }

    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = { title: 'Hogwart\'s HeadMaster Database' };
        context.jsscripts = [];
        var mysql = req.app.get('mysql');
        getProfessor(res,mysql, context, done);
        function done(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('createClass',context);
            }
        }});

    router.post('/', function(req, res){
        console.log("Adding Class");
        console.log(req.body);

        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO class (class.name, class.professor) VALUES (?,?);";

        var inserts = [req.body.className, req.body.pID];
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