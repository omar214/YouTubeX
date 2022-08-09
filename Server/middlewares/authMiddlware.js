import jwt from 'jsonwebtoken';
import createError from '../utils/error.js';

// Verify
const verifyAuth = (req, res, next) => {
	const token = req.headers.authorization;
	console.log(token);
	const JWT_KEY = process.env.JWT_KEY || 'secret key';
	if (!token) next(createError(401, 'No token provided'));

	try {
		const decoded = jwt.verify(token, JWT_KEY);
		req.userData = decoded;
		next();
	} catch (err) {
		next(err);
	}
};

export default verifyAuth;
