var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Hogwart\'s HeadMaster Database' });
});


/* GET update Student page. */
router.get('/updateStudent', function(req, res, next) {
  res.render('updateStudent', { title: 'Hogwart\'s HeadMaster Database' });
});

/* GET update Pets page. */
router.get('/updatePets', function(req, res, next) {
  res.render('updatePets', { title: 'Hogwart\'s HeadMaster Database' });
});


/* GET remove Student page. */
router.get('/removeStudentClass', function(req, res, next) {
  res.render('removeStudentClass', { title: 'Hogwart\'s HeadMaster Database' });
});





module.exports = router;
