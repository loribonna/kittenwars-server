import { Document } from "mongoose";


export interface IKitten {
    name?: String;
	age?: Number;
	insertDate?: Date;
    originalName: String
    savedName: String;
    size: Number;
    votes: Number;
}

export interface IKittenExtended extends Document, IKitten {}