var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Hogwart\'s HeadMaster Database' });
});

/* GET expel student page. */


/* GET class enrollment  page. */
router.get('/classEnrollment', function(req, res, next) {
  res.render('classEnrollment', { title: 'Hogwart\'s HeadMaster Database' });
});

/* GET dismiss professor page. */
router.get('/dismissProfessor', function(req, res, next) {
  res.render('dismissProfessor', { title: 'Hogwart\'s HeadMaster Database' });
});

/* GET update Student page. */
router.get('/updateStudent', function(req, res, next) {
  res.render('updateStudent', { title: 'Hogwart\'s HeadMaster Database' });
});

/* GET update wand page. */
router.get('/updateWand', function(req, res, next) {
  res.render('updateWand', { title: 'Hogwart\'s HeadMaster Database' });
});

/* GET update Pets page. */
router.get('/updatePets', function(req, res, next) {
  res.render('updatePets', { title: 'Hogwart\'s HeadMaster Database' });
});

/* GET update Professor page. */
router.get('/updateProfessor', function(req, res, next) {
  res.render('updateProfessor', { title: 'Hogwart\'s HeadMaster Database' });
});

/* GET remove Student page. */
router.get('/removeStudentClass', function(req, res, next) {
  res.render('removeStudentClass', { title: 'Hogwart\'s HeadMaster Database' });
});

/* GET create class page. */
router.get('/createClass', function(req, res, next) {
  res.render('createClass', { title: 'Hogwart\'s HeadMaster Database' });
});

/* GET enroll Student page. */
router.get('/enrollStudent', function(req, res, next) {
  res.render('enrollStudent', { title: 'Hogwart\'s HeadMaster Database' });
});


module.exports = router;
