import { Document } from "mongoose";


export interface IKitten {
    name?: String;
	age?: Number;
	insertDate?: Date;
    originalName: String
    savedName: String;
    size: Number;
    votes: Number;
    approved: Boolean;
}

export interface IKittenExtended extends Document, IKitten {}