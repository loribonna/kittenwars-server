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

	/*async create(file: CreateImageDto): Promise<IUser> {
		const obj: IKitten = {
			originalName: file.originalName,
			savedName: file.filename,
			size: file.size,
		};
		const kitten = new this.kittenModel(obj);
		return kitten.save();
	}

	async findByName(kittenName: String): Promise<IKitten> {
		return this.kittenModel.findOne({ savedName: kittenName });
	}*/
}
