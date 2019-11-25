module.exports = function(){
    var express = require('express');
    var router = express.Router();

    router.get('/', function(req, res, next) {
        res.render('regPet', { title: 'Hogwart\'s HeadMaster Database' });
    });

    router.post("/", function(req, res){
        console.log("ADDING Pet");
        console.log(req.body);


        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO pet (pet.name, pet.species) VALUES (?, ?);";

        var inserts = [req.body.petName, req.body.petSpecies];

        sql = mysql.pool.query(sql, inserts, function(err, results, fields){
            if(err){
                console.log(err);
                res.write(JSON.stringify(err));
                res.end();
            }else{
                console.log(inserts);
                res.redirect('/viewPets');
            }
        });
    });
    return router;
}();