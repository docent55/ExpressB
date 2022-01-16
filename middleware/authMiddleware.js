const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
	if (req.method === 'OPTIONS') {
		next();
	}

	try {
		const token = req.headers.authorization.split(' ')[1];
		if (!token) {
			return res.status(403).json({ message: "User unauthorization" });
		}
		const decodeData = jwt.verify(token, config.get('secretKey'));
		req.user = decodeData;
		next();
	} catch (e) {
		console.log(e);
		return res.status(403).json({ message: 'User unauthorization' });
	}
}