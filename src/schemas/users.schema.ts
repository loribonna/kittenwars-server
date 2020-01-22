import * as mongoose from 'mongoose';

export const UsersSchema = new mongoose.Schema({
	username: String,
	mail: String,
	insertDate: {
		type: Date,
		default: Date.now,
	},
	method: String
});
