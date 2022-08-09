import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import createError from '../utils/error.js';

const singup = async (req, res, next) => {
	try {
		// TODO add validationon email and password
		let pass = req.body.password;
		let { email, name } = req.body;
		if (!email || !pass || !name)
			return next(createError(400, 'Email, name , and password are required'));

		let user = await User.findOne({ email });
		if (user) return next(createError(409, 'User already exists'));

		const hash = bcrypt.hashSync(pass);
		// TODO validation on what send within req.body
		user = new User({ ...req.body, password: hash });
		const savedUser = await user.save();

		let { password, ...other } = savedUser._doc;
		res.status(200).json({ user: other });
	} catch (error) {
		next(error);
	}
};

const login = async (req, res, next) => {
	try {
		console.log(req.body);
		let email = req.body.email;
		let pass = req.body.password;
		if (!email || !pass)
			return next(createError(400, 'Email , and password are required'));

		const user = await User.findOne({ email });
		if (!user) return next(createError(404, 'User not found'));
		// console.log(user);

		const isMatch =
			bcrypt.compareSync(pass, user.password) || pass === user.password;

		if (!isMatch) return next(createError(401, 'Invalid password'));

		const token = jwt.sign({ id: user._id }, process.env.JWT_KEY, {
			expiresIn: '24h',
		});
		const { password, ...other } = user._doc;
		res.status(200).json({
			message: 'Login successful',
			token: token,
			user: other,
		});
	} catch (error) {
		console.log(error);
		next(error);
	}
};

const googleAuth = async (req, res, next) => {};

export { singup, login, googleAuth };
