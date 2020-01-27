import { Length, Min, Max, IsInt, IsDate, IsMongoId, Equals, IsDateString } from 'class-validator';

export const MAX_IMAGE_SIZE = 16 * 1024 * 1024 - 1; // 16 MB

export class KittenInfoDto {
    @IsMongoId()
    _id: String;

    @Length(1,100)
	savedName: String;

    @IsInt()
    @Min(0)
    votes: Number;

    @IsDateString()
    insertDate: Date;

    @IsInt()
	@Max(MAX_IMAGE_SIZE)
	size: Number;
}
