import { Length, Min, Max, IsInt, IsDate, IsMongoId, IsOptional } from 'class-validator';
import { MAX_IMAGE_SIZE } from './create-image.dto';
import { IKitten } from '../interfaces/kitten.interface';


export class CreateKittenDto implements IKitten {
	@Length(1, 40)
	name: String;

	@IsInt()
	@Min(0)
	@Max(30)
	age: Number;

	@IsDate()
	insertDate: Date;

    @IsMongoId()
    id: String;
    
    savedName: String;

    @Length(1, 40)
    originalName: String;

    @IsInt()
	@Max(MAX_IMAGE_SIZE)
	size: Number;

	@IsInt()
	@Min(0)
	votes: Number;

	@IsOptional()
	approved: Boolean;
}
