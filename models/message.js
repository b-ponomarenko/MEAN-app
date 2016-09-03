var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require('../models/user');

var schema = new Schema({
    content: {type: String, required: true},
    user: {type: Schema.Types.ObjectId, ref: 'User'}
});

schema.post('remove', function (doc) {
	User.findById(doc.user, function (err, user) {
		user.messages.pull();
		user.save();
	});
});

module.exports = mongoose.model('Message', schema);