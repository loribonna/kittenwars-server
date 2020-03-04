import { Length, Min, Max, IsInt, IsOptional } from 'class-validator';
import { IKitten } from '../interfaces/kitten.interface';
import { DtoBase } from './dto.base';
import {
	PipeTransform,
	Injectable,
	ArgumentMetadata,
	BadRequestException,
} from '@nestjs/common';

export class CreateKittenDto extends DtoBase {
	constructor(kitten: Partial<IKitten>) {
		super();
		this.name = kitten.name;
		this.age = kitten.age;
	}

	@Length(1, 40)
	name: String;

	@IsOptional()
	@IsInt()
	@Min(0)
	@Max(30)
	age: Number;
}

@Injectable()
export class CreateKittenDtoValidatorPipe implements PipeTransform {
	async transform(value: any, metadata: ArgumentMetadata) {
		if (value.kitten && typeof value.kitten === 'string') {
			const kitten = JSON.parse(value.kitten);
			const dto = new CreateKittenDto(kitten);
			try {
				await dto.validateOrReject();
				return { ...value, kitten: kitten };
			} catch (e) {
				throw new BadRequestException('Kitten validation failed');
			}
		} else {
			throw new BadRequestException('Kitten validation failed');
		}
	}
}
