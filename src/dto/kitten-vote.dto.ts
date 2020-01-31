import { IsMongoId } from 'class-validator';

export class KittenVoteDto {
	@IsMongoId()
	kittenVoted: String;

	@IsMongoId()
	kittenA: String;

	@IsMongoId()
	kittenB: String;
}
