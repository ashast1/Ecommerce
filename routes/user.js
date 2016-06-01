var router = require('express').Router();
var User = require('../models/user');


router.get('/signUp', function(req, res, next){

	res.render('accounts/signup', { message: req.flash('loginMessage') });
})


router.post('/signUp', function(req, res, next){

	var user = new User();

	user.profile.name = req.body.name;
	user.email = req.body.email
	user.password = req.body.password;

	User.findOne({email: req.body.email}, function(err, dupEmail){

		if(dupEmail) {

		req.flash('loginMessage', 'Duplicate Email Found. Please Choose Another Email');
		//res.render('signUp', {message: req.flash('info')});
		return res.redirect('/signUp');
		}
	else {

		user.save(function(err){
		if(err) return next(err);
		return res.redirect('/');
	})
	}
	}) 


	
});

module.exports = router;

