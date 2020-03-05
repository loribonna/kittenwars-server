import { IsMongoId } from 'class-validator';

export class KittenDeleteDto {
	@IsMongoId()
	id: String;
}
