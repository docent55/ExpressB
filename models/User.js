const { Schema, model, ObjectId } = require('mongoose');



const User = new Schema({
	username: { type: String, required: true, unique: true },
	email: { type: String, },
	avatar: { type: String },
	bio: { type: String },
	birthday: { type: Date, },
	roles: [{ type: String, ref: 'Role' }]
});

module.exports = model('User', User);
