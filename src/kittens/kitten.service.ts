import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { IKitten, IKittenExtended } from '../interfaces/kitten.interface';
import { KITTEN_MODEL_INJECTION_KEY } from '../constants/constants';
import { CreateImageDto } from '../dto/create-image.dto';
import { deleteImage } from '../helpers/delete-img';
import { CreateKittenDto } from '../dto/create-kitten.dto';

@Injectable()
export class KittenService {
	constructor(
		@Inject(KITTEN_MODEL_INJECTION_KEY)
		private readonly kittenModel: Model<IKittenExtended>,
	) {}

	async create(
		file: CreateImageDto,
		kittenInfo: CreateKittenDto,
	): Promise<IKitten> {
		const obj: IKitten = {
			name: kittenInfo.name,
			age: kittenInfo.age,
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

	async getApprovedKittens(pageNumber?: number, pageSize?: number) {
		let queryBase = this.kittenModel.aggregate([
			{ $match: { approved: { $exists: true, $eq: true } } },
		]);
		if (!pageNumber) {
			return queryBase;
		} else {
			pageSize = pageSize ? pageSize : 20;
			const skips = pageSize * (pageNumber - 1);

			return queryBase.skip(skips).limit(pageSize);
		}
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

	async approveKitten(id: String) {
		return this.kittenModel.findOneAndUpdate(
			{
				_id: id,
			},
			{ approved: true },
			{ new: true },
		);
	}

	async deleteKitten(id: String) {
		const kitten = await this.kittenModel.findOne({ _id: id });

		return Promise.all([
			deleteImage(kitten.savedName),
			this.kittenModel.deleteOne({ _id: id }),
		]);
	}
}
