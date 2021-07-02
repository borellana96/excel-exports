
import * as fs from 'fs';
import * as path from 'path';

export class Constants {
	static jwtKeys(keyRequest: string): string {
		switch (keyRequest) {
			case 'privateKey': {
				const keySend =
					`-----BEGIN RSA PRIVATE KEY-----
MIIBOQIBAAJBAKrfRWO3enOoytlNfUuNd5yjTjcXSe+fyGz2U2yh4fclqL/rWQys7DHmWbw12ok3k2FIpg7oA3hAgtgublaiZlkCAwEAAQJAfaYxIGKLaQF2KNUSjbw5eLWdjmVRuSOF/pokPn3L7DBQXzyAqeNMqY6xXF5QmRlxNZ9PGYXylSXSJZBePjkEAQIhAORRwMedbvmBh0QhaPZLMVWOMfssws0IOUAPhQiYPwZlAiEAv5aOAsgfvZW1S26FQh7dDMnSTsnlO7u2enqf26MRFuUCIBuTEBBLoDp7/UUqL84HGMc3bCvkpQY0Jw3oke2OzZXNAiACEFsjSIifADfdwikJV0/GTX5IfwBLLnB+zUdflFggyQIgdX255JSWJcJ9yGvYryD/ukiOlmuWxY5exO0gJIIcHS0=
-----END RSA PRIVATE KEY-----`; /* fs.readFileSync(path.join(__dirname, '../../file/key_authorization.ppk'), 'utf8'); */
				return keySend;
			}
			case 'publicKey': {
				const keySend =
					`-----BEGIN PUBLIC KEY-----
MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAKrfRWO3enOoytlNfUuNd5yjTjcXSe+fyGz2U2yh4fclqL/rWQys7DHmWbw12ok3k2FIpg7oA3hAgtgublaiZlkCAwEAAQ==
-----END PUBLIC KEY-----` /* fs.readFileSync(path.join(__dirname, '../../file/key_authorization.puv'), 'utf8'); */
				return keySend;
			}
			case 'loginKey': {
				const keySend =
					`-----BEGIN PUBLIC KEY-----
MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAIu+SitTqEqImZqzFrKkvp58PVbcSGDv/q9l4xkYe24kU5AACSZcTYRQrfPwL9Sr+VZNgZiZH7AIeV5GEgZG3QMCAwEAAQ==
-----END PUBLIC KEY-----`; /* fs.readFileSync(path.join(__dirname, '../../file/key_login.puv'), 'utf8'); */
				return keySend;
			}
		}
	}

	static environment: 'STAGING' | 'PROD' | string = process.env.ENVIRONMENT || 'STAGING';

	static parametersLuxury(): any {
		const parameter: any = {};
		switch (this.environment.trim()) {
			case 'PROD': {
				parameter.urlValidEmail = 'lllllll';
				parameter.conexionConnect = 'ssss';
				break;
			}
			case 'STAGING': {
				parameter.conexionConnect =
					process.env.SONR_MIDDLEWARE_DB_CONNECTION ||
					'mongodb://10.147.18.26:27017/SONR_DATABASE_ADMINISTRATOR';
				parameter.backendUrl = 'http://localhost:3100';
				parameter.key =
					'e000774649f2a2d32685310d76dab0ca597561d6f2818879fb75dd8f44f3211abb78e4c5d7bc920b70c3765e2fb0b39d';
				break;
			}
		}
		return parameter;
	}
}
