import * as fs from 'fs';
import { join } from 'path';

export async function deleteImage(name) {
	return new Promise((resolve, reject) => {
		if (!name) {
			reject('Kitten name not found');
		}
		fs.unlink(join(__dirname, '..', '..', 'files', name), err => {
			if (err) {
				reject(err);
			} else {
				resolve();
			}
		});
	});
}
