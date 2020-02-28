import * as mongoose from 'mongoose';

const UserAccountSchema = new mongoose.Schema({
	id: String,
	token: String,
});

export const UsersSchema = new mongoose.Schema({
	username: String,
	email: String,
	insertDate: {
		type: Date,
		default: Date.now,
	},
	method: String,
	score: {
		type: Number,
		default: 0,
	},
	account: UserAccountSchema,
	isAdmin: { type: Boolean, default: false },
});
