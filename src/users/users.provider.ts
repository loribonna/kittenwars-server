import { Connection } from 'mongoose';
import {
	USER_MODEL_INJECTION_KEY,
	DATABASE_INJECTION_KEY,
} from 'src/constants/constants';
import { UsersSchema } from 'src/schemas/users.schema';

export const usersProvider = [
	{
		provide: USER_MODEL_INJECTION_KEY,
		useFactory: (connection: Connection) =>
			connection.model('Users', UsersSchema),
		inject: [DATABASE_INJECTION_KEY],
	},
];
