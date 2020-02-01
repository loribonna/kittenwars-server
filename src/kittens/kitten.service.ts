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
			votes: 0,
			approved: false,
		};
		const kitten = new this.kittenModel(obj);
		return kitten.save();
	}

	async findByName(kittenName: String): Promise<IKitten> {
		return this.kittenModel.findOne({
			savedName: kittenName,
			approved: { $exists: true, $eq: true },
		});
	}

	async findById(kittenID: String): Promise<IKitten> {
		return this.kittenModel.findOne({
			_id: kittenID,
			approved: { $exists: true, $eq: true },
		});
	}

	async getRandomKittens(size = 1): Promise<IKitten[]> {
		return this.kittenModel.aggregate([
			{ $match: { approved: { $exists: true, $eq: true } } },
			{ $sample: { size: size } },
		]);
	}

	async voteKitten(kittenID: String): Promise<IKitten> {
		return this.kittenModel.findOneAndUpdate(
			{ _id: kittenID },
			{ $inc: { votes: 1 } },
			{ new: true },
		);
	}

	async getMostLikedKittens(limit: number = 1) {
		if (limit <= 0) {
			return;
		}
		return this.kittenModel
			.find({ approved: { $exists: true, $eq: true } })
			.sort({ votes: 'desc' })
			.limit(limit);
	}

	async getLeastLikedKittens(limit: number = 1) {
		if (limit <= 0) {
			return;
		}
		return this.kittenModel
			.find({ approved: { $exists: true, $eq: true } })
			.sort({ votes: 'asc' })
			.limit(limit);
	}

	async getNotApprovedKittens() {
		return this.kittenModel.find({
			$or: [
				{ approved: { $exists: false } },
				{ approved: { $exists: true, $eq: false } },
			],
		});
	}
}
