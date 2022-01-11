const { Schema, model, ObjectId } = require('mongoose');


const User = new Schema({
	username: { type: String, required: true, unique: true },
	email: { type: String, required: true, unique: true },
	avatar: { type: String },
	bio: { type: String },
	birthday: { type: Date, required: true },
	roles: [{ type: String, ref: Role }]
});

module.exports = model('User', User);
