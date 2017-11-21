import config from '../config.js';
import AWS from 'aws-sdk';
import sigV4Client from './sigV4Client';
import { log, logTitle, logObject, logError, encode } from './utils';
import { CognitoUserPool, CognitoUser, CognitoUserAttribute, AuthenticationDetails } from 'amazon-cognito-identity-js';

// http://serverless-stack.com/chapters/connect-to-api-gateway-with-iam-auth.html
export async function invokeApig(
	{ base,
		path,
		method = 'GET',
		headers = {},
		queryParams = {},
		body }, userToken, loginCallback) {

	logTitle('API ' + method + ': ' + path);

	// This was just ...
	// if (AWS.config.credentials) {
	if (AWS.config.credentials &&
		AWS.config.credentials.accessKeyId &&
		AWS.config.credentials.secretAccessKey) {

		log('(credentials already exist)');
		log('accessKeyId: ' + AWS.config.credentials.accessKeyId);
		log('secretAccessKey: ' + AWS.config.credentials.secretAccessKey);
		log('');
	} else {
		log('There are no pre-existing credentials, so they are being fetched ...');

		await getAwsCredentials(userToken);

		logTitle('Auth Complete!  The new credentials are ...');
		log('accessKeyId: ' + AWS.config.credentials.accessKeyId);
		log('secretAccessKey: ' + AWS.config.credentials.secretAccessKey);
		log('');
	}

	let region, endpoint;

	if (base === 'cards') {
		region = config.apiGateway.cards.REGION;
		endpoint = config.apiGateway.cards.URL;
	} else if (base === 'feeds') {
		region = config.apiGateway.feeds.REGION;
		endpoint = config.apiGateway.feeds.URL;
	}

	// "We are simply following the steps to make a signed request to API
	// Gateway here. We first get our temporary credentials using getAwsCredentials
	// and then using the sigV4Client we sign our request. We then use the signed
	// headers to make a HTTP fetch request."
	const newClient = sigV4Client
		.newClient({
			accessKey: AWS.config.credentials.accessKeyId,
			secretKey: AWS.config.credentials.secretAccessKey,
			sessionToken: AWS.config.credentials.sessionToken,
			region,
			endpoint,
		});

	logTitle('V4 Signature:');
	logObject('sigV4Client', newClient);
	log('');

	if (newClient) {
		const signedRequest = sigV4Client
			.newClient({
				accessKey: AWS.config.credentials.accessKeyId,
				secretKey: AWS.config.credentials.secretAccessKey,
				sessionToken: AWS.config.credentials.sessionToken,
				region,
				endpoint,
			})		
			.signRequest({
				method,
				path,
				headers,
				queryParams,
				body
			});

		body = body ? JSON.stringify(body) : body;
		headers = signedRequest.headers;

		log('Creating a signed API request to ' + signedRequest.url + ' ...');
		log('');

		logTitle('HTTP headers:');
		logObject('headers', headers);
		log('');

		const results = await fetch(signedRequest.url, {
			method,
			headers,
			body
		});

		if (results.status !== 200) {
			throw new Error(await results.text());
		}

		return results.json();

	// TODO: I thought that this is where we would end up when the token is expired,
	// but it's not (so far) working out that way, so I may need to generalize this error ...
	} else {
		logError(null, 'Your session has expired, you\'ve been logged out', userToken,
			true, null, 'Login', () => loginCallback());
	}
}

// http://serverless-stack.com/chapters/upload-a-file-to-s3.html
export function getAwsCredentials(userToken) {
	// First check to see if there are already credentials and they have more time to go
	if (AWS.config.credentials && Date.now() < AWS.config.credentials.expireTime - 60000) {

		log('(credentials should still be valid, will expire in ' +
			parseInt((AWS.config.credentials.expireTime - Date.now())/60000, 10) +
			' minutes)');
		log('accessKeyId: ' + AWS.config.credentials.accessKeyId);
		log('secretAccessKey: ' + AWS.config.credentials.secretAccessKey);
		log('');

		return;

	} else {
		log('credentials are stale, fetching new credentials ...');
		log('');

		const authenticator =
			`cognito-idp.${config.cognito.REGION}.amazonaws.com/${config.cognito.USER_POOL_ID}`;

		AWS.config.update({ region: config.cognito.REGION });

		AWS.config.credentials = new AWS.CognitoIdentityCredentials({
			IdentityPoolId: config.cognito.IDENTITY_POOL_ID,
			Logins: {
				[authenticator]: userToken
			}
		});

		return AWS.config.credentials.getPromise();
	}
}

export function tokenExpired() {
	return AWS.config && AWS.config.credentials ?
		Date.now() > AWS.config.credentials.expireTime - 60000 :
		true;
}

export async function refreshToken(userToken, username) {
	if (AWS.config.credentials &&
		AWS.config.credentials.accessKeyId &&
		AWS.config.credentials.secretAccessKey &&
		!tokenExpired()) {

		const minutes = parseInt((AWS.config.credentials.expireTime - Date.now())/60000, 10);

		log('(credentials should still be valid, will expire in ' + minutes +
			' minutes');
		log('accessKeyId: ' + AWS.config.credentials.accessKeyId);
		log('secretAccessKey: ' + AWS.config.credentials.secretAccessKey);
		log('');
	} else {
		log('There are no pre-existing credentials, so they are being fetched ...');

		await getAwsCredentials(userToken, username);

		logTitle('Auth Complete!  The new credentials are ...');
		log('accessKeyId: ' + AWS.config.credentials.accessKeyId);
		log('secretAccessKey: ' + AWS.config.credentials.secretAccessKey);
		log('');
	}
}

// http://serverless-stack.com/chapters/upload-a-file-to-s3.html
// 1. It takes a file object and the user token as parameters.
export async function s3Upload(file, userToken) {
	await getAwsCredentials(userToken);

	const s3 = new AWS.S3({
		params: {
			Bucket: config.s3.BUCKET,
		}
	});

	// 2. Generates a unique filename prefixed with the identityId.
	//    This is necessary to secure the files on a per-user basis.
	const filename = `${AWS.config.credentials.identityId}-${Date.now()}-${file.name}`;

	// 3. Upload the file to S3 and set it’s permissions to public-read
	//    to ensure that we can download it later.
	// 4. And return a Promise object.
	return s3.upload({
		Key: filename,
		Body: file,
		ContentType: file.type,
		ACL: 'public-read',
	}).promise();
}

export async function s3Download(s3Key, fileType, source, userToken) {
	// await refreshToken(userToken, username);

	logTitle('s3Download from Bucket:');
	log('source: ' + source);
	log(config.s3[source].BUCKET);
	log('');

	const bucket = new AWS.S3({
		params: {
			Bucket: config.s3[source].BUCKET
		},

		region: config.s3[source].REGION
	});

	return new Promise((resolve, reject) => {
		bucket.getObject({ Key: s3Key },
			(err, data) => {

			if (err) {
				logError( err, 'Image Download Error: Could not fetch the image',
					userToken );

				reject(err);
				return;
			}

			log('... S3 image received: ' + s3Key);

			let image = new Image();
			image.src = "data:" + fileType + ";base64," + encode(data.Body);

			image.onload = () => {
				resolve(image);
			}
		});
	});
}

// getCurrentUser() and getUserToken() come from http://serverless-stack.com
// /chapters/load-the-state-from-the-session.html. There is similar code at
// http://docs.aws.amazon.com/cognito/latest/developerguide
// /using-amazon-cognito-user-identity-pools-javascript-examples.html.
export function getCurrentUser() {
	const userPool = new CognitoUserPool({
		UserPoolId: config.cognito.USER_POOL_ID,
		ClientId: config.cognito.APP_CLIENT_ID
	});

	return userPool.getCurrentUser();
}

// There is an excellent explanation (and diagram) of JWT Tokens at
// https://medium.com/@rajaraodv/securing-react-redux-apps-with-jwt-tokens-fcfe81356ea0
export function getUserToken(currentUser) {
	return new Promise((resolve, reject) => {
		logTitle('Auth Step 2: Fetching user session and user token, and refreshing the user\'s Cognito session in case it has expired ...');

		currentUser.getSession((err, session) => {
			if (err) {
				reject(err);
				return;
			}

			if (session.isValid()) {
				log('session is valid');
			} else {
				log('session is not valid!');
			}

			log('');
			logTitle('Auth Step 3: Now fetching user attributes from Cognito ...');

			// getSession must be called to authenticate
			// user before calling getUserAttributes
			currentUser.getUserAttributes((err, attributes) => {
				if (err) {
					reject(err);
					return;
				}

				logObject('cognito user attributes', attributes);
				log('');

				resolve([
					session.getIdToken().getJwtToken(),
					attributes
				]);
			});
		});
	});
}

// From http://serverless-stack.com/chapters/login-with-aws-cognito.html
export function login(username, password) {
	const userPool = new CognitoUserPool({
		UserPoolId: config.cognito.USER_POOL_ID,
		ClientId: config.cognito.APP_CLIENT_ID
	});

	const authenticationData = {
		Username: username,
		Password: password
	};

	const user = new CognitoUser({
		Username: username,
		Pool: userPool
	});

	const authenticationDetails = new AuthenticationDetails(authenticationData);

	log('Authenticating user ...');

	return new Promise((resolve, reject) => (
		user.authenticateUser(authenticationDetails, {
			onSuccess: (result) => resolve(result.getIdToken().getJwtToken()),
			onFailure: (err) => reject(err)
		})
	));
}

export function signup(username, password) {
	const userPool = new CognitoUserPool({
		UserPoolId: config.cognito.USER_POOL_ID,
		ClientId: config.cognito.APP_CLIENT_ID
	});

	log('Signing user up ...');

	const attributeEmail = new CognitoUserAttribute({ Name : 'email', Value : username });

	// This has to be set to zero for each user on signup before 
	// it will be accessible by getUserAttributes().  Also:
	// it must be set as a string, but it will function as a
	// number (or it may silently fail).
	// const customAttributeListings = new CognitoUserAttribute({ Name : 'custom:listings', Value : '0' });

	return new Promise((resolve, reject) => (
		userPool.signUp(username, password, [attributeEmail], null, (err, result) => {
			if (err) {
				reject(err);
				return;
			}

			resolve(result.user);
		})
	));
}

export function confirm(user, confirmationCode) {
	return new Promise((resolve, reject) => (
		user.confirmRegistration(confirmationCode, true, function(err, result) {
			log('Confirming registration with Cognito ...');

			if (err) {
				reject(err);
				return;
			}
			resolve(result);
		})
	));
}

export function authenticate(user, username, password) {
	const authenticationData = {
		Username: username,
		Password: password
	};

	const authenticationDetails = new AuthenticationDetails(authenticationData);

	log('Authenticating user ...');

	return new Promise((resolve, reject) => (
		user.authenticateUser(authenticationDetails, {
			onSuccess: (result) => resolve(result.getIdToken().getJwtToken()),
			onFailure: (err) => reject(err),
		})
	));
}
