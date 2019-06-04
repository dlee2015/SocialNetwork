const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req, res, next) {
	// Get token from header,
	const token = req.header('x-auth-token');

	// Check if No token
	if (!token) {
		return res.status(401).json({ msg: 'no token, authorization denied' });
	}

	//verify token if there is one
	try {
		const decoded = jwt.verify(token, config.get('jwtSecret'));

		req.user = decoded.user;
		next();
	} catch {
		res.status(401).json({ msg: 'Token not valid' });
	}
};
