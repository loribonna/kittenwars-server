import { Connection } from 'mongoose';
import { KittenSchema } from '../schemas/kitten.schema';
import {
	KITTEN_MODEL_INJECTION_KEY,
	DATABASE_INJECTION_KEY,
} from 'src/constants/constants';

export const kittenProvider = [
	{
		provide: KITTEN_MODEL_INJECTION_KEY,
		useFactory: (connection: Connection) =>
			connection.model('Kitten', KittenSchema),
		inject: [DATABASE_INJECTION_KEY],
	},
];
