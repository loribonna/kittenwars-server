import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { USER_MODEL_INJECTION_KEY } from 'src/constants/constants';
import { IUser, IUserExtended } from 'src/interfaces/users.interface';

@Injectable()
export class UsersService {
	constructor(
		@Inject(USER_MODEL_INJECTION_KEY)
		private readonly userModel: Model<IUserExtended>,
	) {}

	async _updateUserScore(user: IUser, update: -1|1): Promise<IUser> {
		return this.userModel.findOneAndUpdate(
			{ 'account.id': user.account.id },
			{ $inc: { score: update } },
			{ new: true },
		);
	}

	async findOne(username: string): Promise<IUser> {
		return this.userModel.findOne({ username: username });
	}

	async findById(id: String): Promise<IUser> {
		return this.userModel.findOne({ 'account.id': id });
	}

	async create(user: IUser): Promise<IUser> {
		const newUser = new this.userModel(user);
		return newUser.save();
	}

	async userExists(user: IUser): Promise<boolean> {
		const doc = await this.userModel
			.find({ 'account.id': user.account.id })
			.limit(1);
		return doc != null;
	}

	async getScoreBoard(limit: number = 10): Promise<IUser[]> {
		return this.userModel
			.find()
			.sort({ score: 'desc' })
			.limit(limit);
	}

	async getPositionScoreBoard(user: IUser): Promise<number> {
		return this.userModel
			.find({ score: { $gt: user.score } })
			.count()
			.then(count => count + 1);
	}

	async incUserScore(user: IUser): Promise<IUser> {
		return this._updateUserScore(user, 1);
	}

	async decUserScore(user: IUser) :Promise<IUser> {
		return this._updateUserScore(user, -1);
	}
}
