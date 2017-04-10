var express = require('express');
var router = express.Router();
var fs=require("fs");


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('contactus', { title: 'Contact US',_csrf:req.csrfToken() });
});


router.post('/', function(req, res, next) {

type=req.body.suggestion || req.body.complaint;

var ip=req.ip;
fs.appendFile("message.txt",JSON.stringify(req.body),function(err){
   req.assert("fullName","Full Name required").notEmpty();
   req.assert("message","message required").notEmpty();
   var errors=req.validationErrors();
   if(errors){
       console.log(errors);
res.render('contactus', {title:"contactus", errors:errors,_csrf:req.csrfToken()});       
   }

else

res.redirect(302,"/thankyou?fullName="+req.body.fullName+"&ip="+ip);


})

  
});

module.exports = router;
