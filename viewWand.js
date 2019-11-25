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