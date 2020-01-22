import * as mongoose from 'mongoose';

export const UsersSchema = new mongoose.Schema({
	name: String,
	mail: String,
	insertDate: {
		type: Date,
		default: Date.now,
	},
	method: String
});
