import * as fs from 'fs';
import { join } from 'path';
import { Response } from 'express';
import { InternalServerErrorException } from '@nestjs/common';

export async function fetchImage(imgName: string): Promise<Buffer> {
	return new Promise((resolve, reject) => {
		fs.readFile(
			join(__dirname, '..', '..', 'files', imgName),
			(err, data) => {
				if (err) reject(err);
				else resolve(data);
			},
		);
	});
}

export async function fetchImageAndSend(imgName: string, res: Response) {
	try {
		const data = await fetchImage(imgName);
		res.contentType('jpeg');
		res.send(data.toString('base64'));
	} catch (e) {
		throw new InternalServerErrorException('Error retriving image');
	}
}
