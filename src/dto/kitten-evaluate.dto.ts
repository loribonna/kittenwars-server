import { IsBoolean, IsMongoId } from 'class-validator';

export class KittenEvaluateDto {
    @IsBoolean()
    accepted: Boolean;

    @IsMongoId()
    kittenId: String;
}
