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

    function getPets(res, mysql, context, done){
        var sql = "SELECT * FROM pet;";
        mysql.pool.query(sql, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.pets = results;
            console.log(context.pets);
            done();
        })
    }

    function getOnePro(res, mysql, context, id, done){
        var sql = "SELECT professor.professor_id as pID, first_name as fname, last_name as lname, school.name as profSchool, house.name as profHouse, pet.name as profPet, wand.core as profWand FROM professor\n" +
            "LEFT JOIN school ON professor.school = school.school_id\n" +
            "LEFT JOIN house ON professor.house = house.house_id\n" +
            "LEFT JOIN pet ON professor.pet = pet.pet_id\n" +
            "LEFT JOIN wand ON professor.wand = wand.wand_id WHERE professor_id = ?;";

        var inserts = [id];
        console.log(inserts);

        mysql.pool.query(sql, inserts, function(error, results, fields){
                if(error){
                    res.write(JSON.stringify(error));
                    res.end();
                }
                context.professor = results[0];
                done();
            });
    }

    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = { title: 'Hogwart\'s HeadMaster Database' };
        context.jsscripts = ["deleteProfessor.js"];
        var mysql = req.app.get('mysql');
        getProfessor(res,mysql, context, done);
        function done(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('viewProfessor',context);
            }

        }});

    router.get('/:id', function(req, res){
        callbackCount = 0;
        var context = { title: 'Hogwart\'s HeadMaster Database' };
        context.jsscripts = [ "update.js"];
        var mysql = req.app.get('mysql');
        getOnePro(res, mysql, context, req.params.id, complete);
        getPets(res,mysql,context,complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 2){
                res.render('updateProfessor', context);
            }

        }
    });

    router.delete('/:id', function(req, res){

        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM professor WHERE professor_id = ?";

        var inserts = [req.params.id];

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



    router.put('/:id', function(req, res){
        console.log(req.body);

        var mysql = req.app.get('mysql');
        var sql = "UPDATE professor SET first_name=?, last_name=?, school=?, house=?, pet=? WHERE professor_id=?";
        var inserts = [req.body.fName, req.body.lName, req.body.school, req.body.house, req.body.pet, req.params.id];
        console.log(inserts);

        sql = mysql.pool.query(sql, inserts, function(err, result, fields){
            if(err){
                console.log(err);
                res.write(JSON.stringify(err));
                res.end();
            }else{
                console.log("Professor UPDATED");
                res.status(200);
                res.end();
            }
        });
    });

    return router;
}();