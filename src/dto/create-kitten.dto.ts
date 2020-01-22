import { Length, Min, Max, IsInt, IsDate, IsMongoId } from 'class-validator';
import { MAX_IMAGE_SIZE } from './create-image.dto';

export interface IKitten {
    name?: String;
	age?: Number;
	insertDate?: Date;
    id?: String;
    originalName: String
    savedName: String;
	size: Number;
}

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
}
