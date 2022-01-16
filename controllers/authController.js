const User = require('../models/User');
const Role = require('../models/Role');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const config = require('config');

const generationToken = (id, roles) => {
	const payload = {
		id,
		roles
	}
	return jwt.sign(payload, config.get('secretKey'), { expiresIn: '12h' });
}

class AuthController {
	async registration(req, res) {

		try {

			const errors = validationResult(req);

			if (!errors.isEmpty()) {
				return res.status(400).json({ message: 'Registration error', errors });
			}

			const { username, password } = req.body;
			const candidate = await User.findOne({ username });
			console.log(username, password)
			if (candidate) {
				return res.status(400).json({ message: 'This username exist' });
			}

			const hashPassword = bcrypt.hashSync(password, 7);
			const userRole = 'USER';
			console.log(111, userRole)
			const user = new User({ username, password: hashPassword, roles: userRole });
			await user.save();
			return res.json({ message: 'User created' });

		} catch (e) {

			console.log(e);
			res.status(400).json({ message: 'Registration error' });

		}
	}

	async login(req, res) {
		try {

			const { username, password } = req.body;
			const user = await User.findOne({ username });
			if (!user) {
				return res.status(400).json({ message: `User ${username} not was faund` });
			}

			const isPasswordCorrect = bcrypt.compareSync(password, user.password);
			if (!isPasswordCorrect) {
				return res.status(400).json({ message: `Passworod wrong` });
			}

			const token = generationToken(user._id, user.roles);
			return res.json({ token });
		} catch (e) {
			console.log(e);
			res.status(400).json({ message: 'Some login error' });
		}
	}
}

module.exports = new AuthController();
