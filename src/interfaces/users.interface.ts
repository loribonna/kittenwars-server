import { Document } from "mongoose";

export interface IUser {
    username: String;
	insertDate?: Date;
	method: String;
	account: {
		id: String;
		token: String;
	}
	score: Number;
}

export interface IUserExtended extends Document, IUser {}