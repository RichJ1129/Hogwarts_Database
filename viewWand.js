module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getStudent(res, mysql, context, done){
        var sql = "SELECT wand_id as wID, wand.length as length, material as material, core as core FROM wand";
        mysql.pool.query(sql,
            function(error, results, fields){
                if(error){
                    res.write(JSON.stringify(error));
                    res.end();
                }
                context.wand = results;
                console.log(context.wand);
                done();
            });
    }

    router.delete('/:id', function(req, res){

        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM wand WHERE wand_id = ?";

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
        var sql = "UPDATE wand SET length=?, material=?, core=? WHERE wand_id=?";
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

    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = { title: 'Hogwart\'s HeadMaster Database' };
        context.jsscripts = ["deleteWand.js"];
        var mysql = req.app.get('mysql');
        getStudent(res,mysql, context, done);
        function done(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('viewWand',context);
            }

        }});
    return router;
}(); 