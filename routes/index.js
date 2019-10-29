var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Hogwart\'s HeadMaster Database' });
});

router.get('/regStudent', function(req, res, next) {
  res.render('regStudent', { title: 'Hogwart\'s HeadMaster Database' });
});

router.get('/regProfessor', function(req, res, next) {
  res.render('regProfessor', { title: 'Hogwart\'s HeadMaster Database' });
});

router.get('/regPet', function(req, res, next) {
  res.render('regPet', { title: 'Hogwart\'s HeadMaster Database' });
});

router.get('/regWand', function(req, res, next) {
  res.render('regWand', { title: 'Hogwart\'s HeadMaster Database' });
});

router.get('/viewStudent', function(req, res, next) {
  res.render('viewStudent', { title: 'Hogwart\'s HeadMaster Database' });
});

router.get('/viewWand', function(req, res, next) {
  res.render('viewWand', { title: 'Hogwart\'s HeadMaster Database' });
});

router.get('/viewPets', function(req, res, next) {
  res.render('viewPets', { title: 'Hogwart\'s HeadMaster Database' });
});

router.get('/viewProfessor', function(req, res, next) {
  res.render('viewProfessor', { title: 'Hogwart\'s HeadMaster Database' });
});



module.exports = router;
