module.exports = function(){
    var express = require('express');
    var router = express.Router();

    router.get('/', function(req, res, next) {
        res.render('regWand', { title: 'Hogwart\'s HeadMaster Database' });
    });

    router.post('/', function(req, res){
        console.log("Adding Wand");
        console.log(req.body);

        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO wand (wand.length, wand.material, wand.core) VALUES (?, ?,?);";

        var inserts = [req.body.wandLen, req.body.matName, req.body.coreName];

        sql = mysql.pool.query(sql, inserts, function(err, results, fields){
            if(err){
                console.log(err);
                res.write(JSON.stringify(err));
                res.end();
            }else{
                console.log(inserts);
                res.redirect('/viewWand');
            }
        });
    });
    return router;
}(); 