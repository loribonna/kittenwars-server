import { Document } from "mongoose";

export interface IUser {
    name: String;
	mail: String;
	insertDate?: Date;
	method: String;
}

export interface IUserExtended extends Document, IUser {}