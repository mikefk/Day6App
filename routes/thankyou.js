var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

  res.render('thankyou', { fullName: req.query.fullName ,title:"thankyou",ip:req.query.ip});
});

module.exports = router;
