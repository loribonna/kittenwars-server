export const MONGODB_CONNECTION_URI = process.env.MONGODB_URI;
export const DATABASE_INJECTION_KEY = 'DATABASE_CONNECTION';
export const KITTEN_MODEL_INJECTION_KEY = 'KITTEN_MODEL';
export const USER_MODEL_INJECTION_KEY = 'USER_MODEL';
export const BASE_URL_WITH_PORT = 'http://kittenwars-awm.herokuapp.com:' + process.env.PORT;
export const BASE_URL =
	'http://kittenwars-awm.herokuapp.com';

export const enum AuthMode {
	'google' = 'google',
}
