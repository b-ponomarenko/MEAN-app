const express = require('express');
const router = express.Router();
const passHash = require('password-hash');
const JWT = require('jsonwebtoken');

const User = require('../models/user');
const config = require('../config');

router.post('/', function ({body: {firstName, lastName, password, email}}, res, next) {
	const user = new User({
		firstName,
		lastName,
		password: passHash.generate(password)
		, email});
	user.save(function (err, result) {
		if (err) {
			return res.status(404).json({
				title: 'An error occurred',
				error: err
			});
		}
		res.status(200).json(result);
	})
});

router.post('/signin', function ({body: {password, email}}, res, next) {
	User.findOne({email}, function (err, user) {
		if (err) {
			return res.status(404).json({
				title: 'An error occurred',
				error: err
			});
		}
		if (!user) {
			return res.status(404).json({
				title: 'No user found',
				error: {message: 'User could not be found'}
			});
		}
		if ( !passHash.verify(password, user.password) ) {
			return res.status(404).json({
				title: 'Could not sign you in',
				error: {message: 'Wrong password'}
			});
		}
		const token = JWT.sign({user}, config.token, {expiresIn: 7200});
		res.status(200).json({
			token,
			userId: user._id
		});
	});
});

module.exports = router;