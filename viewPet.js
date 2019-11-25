module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getStudent(res, mysql, context, done){
        var sql = "SELECT pet.pet_id as petID, pet.name as petName, species as petSpecies FROM pet" ;
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

    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = { title: 'Hogwart\'s HeadMaster Database' };
        context.jsscripts = ["deletePet.js"];
        var mysql = req.app.get('mysql');
        getStudent(res,mysql, context, done);
        function done(){
            callbackCount++;
            if(callbackCount >= 0){
                res.render('viewPets',context);
            }

        }});
    return router;
}();