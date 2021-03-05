const router = require('express').Router();
let Exercise = require('../models/exercise.model');
let User = require('../models/user.model');


router.route('/').get((req, res) => {

  var start = new Date();
  start.setHours(0,0,0,0);

  var end = new Date();
  end.setHours(23,59,59,999);
  
  Exercise.find({createdAt: {$gte: start, $lt: end} })
    .then(exercises => res.json(exercises))
    .catch(err => res.status(400).json('Error:', + err));
})


module.exports = router;

