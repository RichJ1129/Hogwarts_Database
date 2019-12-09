module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getPet(res, mysql, context, done){
        var sql = "SELECT pet.pet_id as petID, name as petName, species as petSpecies FROM pet where petID NOT '999'" ;
        mysql.pool.query(sql,
            function(error, results, fields){
                if(error){
                    res.write(JSON.stringify(error));
                    res.end();
                }
                context.pet = results;
                console.log(context.pet);
                done();
            });
    }

    function getOnePet(res, mysql, context, id, done){
        var sql = "SELECT pet.pet_id as petID, pet.name as petName, species as petSpecies FROM pet WHERE pet.pet_id = ?;";

        var inserts = [id];
        console.log(inserts);

        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.pet = results[0];
            done();
        });
    }

    router.delete('/:id', function(req, res){

        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM pet WHERE pet_id = ?";

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
        var mysql = req.app.get('mysql');
        console.log(req.body)
        console.log(req.params.id)
        var sql = "UPDATE pet SET name=?, species=? WHERE pet_id=?";
        var inserts = [req.body.petName, req.body.petSpecies, req.params.id];
        console.log(inserts);

        sql = mysql.pool.query(sql, inserts, function(err, result, fields){
            if(err){
                console.log(err);
                res.write(JSON.stringify(err));
                res.end();
            }else{
                console.log("Pet UPDATED");
                res.status(200);
                res.end();
            }
        });
    });

    router.get('/:id', function(req, res){
        callbackCount = 0;
        var context = { title: 'Hogwart\'s HeadMaster Database' };
        context.jsscripts = [ "updatePet.js"];
        var mysql = req.app.get('mysql');
        getOnePet(res, mysql, context, req.params.id, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('updatePet', context);
            }

        }
    });

    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = { title: 'Hogwart\'s HeadMaster Database' };
        context.jsscripts = ["deletePet.js"];
        var mysql = req.app.get('mysql');
        getPet(res,mysql, context, done);
        function done(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('viewPet',context);
            }

        }});
    return router;
}();