const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const authMiddleware = async (req, res, next) => {
	try {
		// Get token from cookies
		const token = req.cookies.accessToken;

		if (!token)
			return res.status(401).json({ message: "Access token missing" });

		// Verify token
		const decoded = jwt.verify(token, process.env.JWT_SECRET);

		// Find user
		const user = await User.findById(decoded.id);
		if (!user) return res.status(401).json({ message: "User not found" });

		// Attach user to request
		req.user = user;
		next();
	} catch (error) {
		res.status(401).json({ message: "Unauthorized", error: error.message });
	}
};

module.exports = authMiddleware;
