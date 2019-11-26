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
            context.student = results;
            console.log(context.student);
            done();
        });
    }

    // function getSchools(res, mysql, context, done){
    //     mysql.pool.query("SELECT school_id as id, name FROM school", function(error, results, fields){
    //         if(error){
    //             res.write(JSON.stringify(error));
    //             res.end();
    //         }
    //         context.schools = results;
    //         done();
    //     });
    // }

    // function getHouses(res, mysql, context, done){
    //     mysql.pool.query("SELECT house_id as id, name FROM house", function(error, results, fields){
    //         if(error){
    //             res.write(JSON.stringify(error));
    //             res.end();
    //         }
    //         context.houses = results;
    //         done();
    //     });
    // }

    // function getPets(res, mysql, context, done){
    //     mysql.pool.query("SELECT pet_id as id, name FROM pet", function(error, results, fields){
    //         if(error){
    //             res.write(JSON.stringify(error));
    //             res.end();
    //         }
    //         context.pets = results;
    //         done();
    //     });
    // }

    // function getWands(res, mysql, context, done){
    //     mysql.pool.query("SELECT wand_id as id FROM wand", function(error, results, fields){
    //         if(error){
    //             res.write(JSON.stringify(error));
    //             res.end();
    //         }
    //         context.wands = results;
    //         done();
    //     });
    // }

    // function getStudent(res, mysql, context, id, done){
    //     var sql = "SELECT student_id as id, first_name, last_name, age, school, house, pet, wand FROM student WHERE student_id = ?";
    //     var inserts = [id];
    //     mysql.pool.query(sql, inserts, function(error, results, fields){
    //         if(error){
    //             res.write(JSON.stringify(error));
    //             res.end();
    //         }
    //         context.student = results[0];
    //         done();
    //     });
    // }

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

    // router.get('/:id', function(req,res){
    //     callbackCount = 0;
    //     var context = {};
    //     context.jsscripts = ["selectSchool.js","selectHouse.js","selectPet.js","selectWand.js","updateStudent.js"];
    //     var mysql = req.app.get('mysql');
    //     getStudent(res, mysql, context, req.params.id, done);
    //     getSchools(res, mysql, context, done);
    //     getHouses(res,mysql, context, done);
    //     getPets(res, mysql, context, done);
    //     getWands(res, mysql, context, done);
    //     function done(){
    //         callbackCount++;
    //         if(callbackCount >= 5){
    //             res.render('updateStudent', context);
    //         }
    //     }
    // });

    // router.put('/:id',function(req,res){
    //     var mysql = req.app.get('mysql');
    //     console.log(req.body)
    //     console.log(req.params.id)
    //     var sql = "UPDATE student SET first_name=?, last_name=?, age=?, school=?, house=?, pet=?, wand=? WHERE student_id=?";
    //     var inserts = [req.body.first_name, req.body.last_name, req.body.age, req.body.school, req.body.house, req.body.pet, req.body.wand, req.params.id];
    //     sql = mysql.pool.query(sql,inserts,function(error,results,fields){
    //         if(error){
    //             console.log(error)
    //             res.write(JSON.stringify(error));
    //             res.end();
    //         }else{
    //             res.status(200);
    //             res.end();
    //         }
    //     })
    // })

    router.delete('/:id', function(req, res){

        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM student WHERE student_id = ?";

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

    return router;
}();