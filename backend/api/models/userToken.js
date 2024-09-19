var mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userTokenSchema = new Schema({
	userId: { type: Schema.Types.ObjectId, required: true },
	accessToken: { type: String, required: true },
	refreshToken: { type: String, required: true },
	isLoggedIn: { type: Boolean, default: false },
	createdAt: { type: Date, default: Date.now(), expires: 30 * 86400 },
});

const UserToken = mongoose.model("UserToken", userTokenSchema);
module.exports = UserToken;
