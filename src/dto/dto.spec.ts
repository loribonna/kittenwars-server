import { CreateKittenDtoValidatorPipe } from './create-kitten.dto';
import { BadRequestException } from '@nestjs/common';

describe('Create Kitten DTO', () => {
	it('should check kitten dto', async () => {
		const kittenCreate = {
			name: 'name',
			age: 12,
		};

		const t = new CreateKittenDtoValidatorPipe();

		expect(
			await t.transform({ kitten: JSON.stringify(kittenCreate) }, null),
		).toMatchObject({ kitten: kittenCreate });
	});

	it('should not allow bad data', async () => {
		const t = new CreateKittenDtoValidatorPipe();

		expect(t.transform({}, null)).rejects.toEqual(
			'Kitten validation failed',
		);
	});

	it('should validate good kitten dto', async () => {
		let kittenCreate: any = {
			name: 'name',
		};

		const t = new CreateKittenDtoValidatorPipe();

		expect(
			await t.transform({ kitten: JSON.stringify(kittenCreate) }, null),
		).toMatchObject({ kitten: kittenCreate });

		kittenCreate = {
			age: 12,
		};

		expect(
			t.transform({ kitten: JSON.stringify(kittenCreate) }, null),
		).rejects.toEqual('Kitten validation failed');
    });
    
    it('should validate bad kitten dto', async () => {
		let kittenCreate = {
			age: 12,
		};
		const t = new CreateKittenDtoValidatorPipe();

		expect(
			t.transform({ kitten: JSON.stringify(kittenCreate) }, null),
		).rejects.toMatchObject({Error:'Kitten validation failed'});
	});
});
