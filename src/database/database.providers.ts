import * as mongoose from 'mongoose';
import {
	MONGODB_CONNECTION_URI,
	DATABASE_INJECTION_KEY,
} from '../constants/constants';

export const databaseProvider = [
	{
		provide: DATABASE_INJECTION_KEY,
		useFactory: () => {
			const connection = mongoose.connect(MONGODB_CONNECTION_URI)
			mongoose.set('useFindAndModify', false);
			return connection
		},
	},
];
