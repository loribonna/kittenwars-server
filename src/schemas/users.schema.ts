import * as mongoose from 'mongoose';

export const UsersSchema = new mongoose.Schema({
	username: String,
	email: String,
	insertDate: {
		type: Date,
		default: Date.now,
	},
	method: String
});
