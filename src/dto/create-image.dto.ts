import { Length, Min, Max, IsInt, IsDate, IsMongoId, Equals } from 'class-validator';

export const MAX_IMAGE_SIZE = 16 * 1024 * 1024 - 1; // 16 MB

export class CreateImageDto {
	@Equals('image')
	fieldName: String;

    @Length(1, 40)
	originalName: String

    filename: String;
    path: String;

    @IsInt()
	@Max(MAX_IMAGE_SIZE)
	size: Number;
}
