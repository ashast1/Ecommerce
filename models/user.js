var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;

// Create User Schema
var userSchema = new Schema({

	email: {type: String, unique: true, lowercase: true},
	password: String,
	profile: {

			name: {type: String, default: ''},
			picture: {type: String, default: ''}
		},

	address: String,
	history: [{
		date: Date,
		paid: {type: Number, default: 0}
	}]
})


//Create Hash for Password

	userSchema.pre('save', function(next){
		var user = this;

		if(!user.isModified('password')) return next();

		bcrypt.genSalt(10, function(err, salt){
			if(err) return next(err);
			bcrypt.hash(user.password, salt, null, function(err, hash){
				if (err) return next(err);
				user.password = hash;
				next();
			})
		})

	})
	



//Compair Passowrd from database

userSchema.methods.comparePassword = function(password) {
	bcrypt.compair(password, this.password);
}

module.exports = mongoose.model('User', userSchema);