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
}
