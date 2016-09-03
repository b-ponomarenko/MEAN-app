const express = require('express');
const router = express.Router();
const JWT = require('jsonwebtoken');

const Message = require('../models/message');
const User = require('../models/user');
const config = require('../config');

router.get('/', function (req, res, next) {
	Message.find()
		.populate('user', 'firstName')
		.exec(function (err, messages) {
			if (err) {
				return res.status(404).json({
					title: 'An error occurred',
					error: err
				});
			}
			res.status(200).json(messages)
		})
});

router.use('/', function (req, res, next) {

	JWT.verify(req.headers.authorization, config.token, function (err, decoded) {
		if ( err ) {
			return res.status(400).json({
				title: 'Authentication failed',
				error: err
			});
		}
		next();
	});
});

router.post('/', function (req, res, next) {
	const decoded = JWT.decode(req.headers.authorization);
	User.findById(decoded.user._id, function (err, user) {
		if (err) {
			return res.status(404).json({
				title: 'An error occurred',
				error: err
			});
		}
		var message = new Message({
			content: req.body.content,
			user: user
		});
		message.save(function (err, message) {
			if (err) {
				return res.status(404).json({
					title: 'An error occurred',
					error: err
				});
			}
			user.messages.push(message);
			user.save();
			res.status(200).json(message);
		})
	});
});

router.put('/:id', function (req, res, next) {
	const decoded = JWT.decode(req.headers.authorization);
	Message.findById(req.params.id, function (err, message) {
		if (err) {
			return res.status(404).json({
				title: 'An error occurred',
				error: err
			});
		}
		if (!message) {
			return res.status(404).json({
				title: 'No message found',
				error: {message: 'Message could not be found'}
			});
		}
		if ( message.user.toString() !== decoded.user._id ) {
			return res.status(400).json({
				title: 'Authentication failed',
				error: 'Message created by other user'
			});
		}
		message.content = req.body.content;
		message.save(function (err, result) {
			if (err) {
				return res.status(404).json({
					title: 'An error occurred',
					error: err
				});
			}
			res.status(200).json(result);
		});
	});
});

router.delete('/:id', function (req, res, next) {
	const decoded = JWT.decode(req.headers.authorization);
	Message.findById(req.params.id, function (err, message) {
		if (err) {
			return res.status(404).json({
				title: 'An error occurred',
				error: err
			});
		}
		if (!message) {
			return res.status(404).json({
				title: 'No message found',
				error: {message: 'Message could not be found'}
			});
		}
		if ( message.user.toString() !== decoded.user._id ) {
			return res.status(400).json({
				title: 'Authentication failed',
				error: 'Message created by other user'
			});
		}
		message.remove(function (err, result) {
			if (err) {
				return res.status(404).json({
					title: 'An error occurred',
					error: err
				});
			}
			res.status(200).json(result);
		});
	});
});


module.exports = router;