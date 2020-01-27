import * as mongoose from 'mongoose';

export const KittenSchema = new mongoose.Schema({
	name: String,
	age: Number,
	insertDate: {
		type: Date,
		default: Date.now,
	},
	originalName: String,
	savedName: String,
	size: Number,
	votes: {
		type: Number,
		default: 0
	}
});
