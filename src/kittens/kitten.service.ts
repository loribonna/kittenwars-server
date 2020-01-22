import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { IKitten, IKittenExtended } from '../interfaces/kitten.interface';
import { KITTEN_MODEL_INJECTION_KEY } from 'src/constants/constants';
import { CreateImageDto } from 'src/dto/create-image.dto';

@Injectable()
export class KittenService {
	constructor(
		@Inject(KITTEN_MODEL_INJECTION_KEY)
		private readonly kittenModel: Model<IKittenExtended>,
	) {}

	async create(file: CreateImageDto): Promise<IKitten> {
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
	}
}
