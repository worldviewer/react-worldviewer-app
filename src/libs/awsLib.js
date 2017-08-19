import config from '../config.js';
import AWS from 'aws-sdk';
import sigV4Client from './sigV4Client';
import { CognitoUserPool, CognitoUser, CognitoUserAttribute, AuthenticationDetails } from 'amazon-cognito-identity-js';

// http://serverless-stack.com/chapters/connect-to-api-gateway-with-iam-auth.html
// Useful information on API gateway policies here: http://docs.aws.amazon.com/
// apigateway/latest/developerguide/api-gateway-control-access-using-iam-policies-to-invoke-api.html
export async function invokeApig(
	{ base,
		path,
		method = 'GET',
		headers = {},
		queryParams = {},
		body }, userToken) {

	await getAwsCredentials(userToken);

	console.log('config.apiGateway[base].URL: ' + config.apiGateway[base].URL);
	console.log(method + ': ' + path);
	console.log('AWS.config.credentials.accessKeyId: ' + AWS.config.credentials.accessKeyId);
	console.log('AWS.config.credentials.secretAccessKey: ' + AWS.config.credentials.secretAccessKey + '\n\n');

	// "We are simply following the steps to make a signed request to API
	// Gateway here. We first get our temporary credentials using getAwsCredentials
	// and then using the sigV4Client we sign our request. We then use the signed
	// headers to make a HTTP fetch request."
	const signedRequest = sigV4Client
		.newClient({
			accessKey: AWS.config.credentials.accessKeyId,
			secretKey: AWS.config.credentials.secretAccessKey,
			sessionToken: AWS.config.credentials.sessionToken,
			region: config.apiGateway[base].REGION,
			endpoint: config.apiGateway[base].URL,
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

	const results = await fetch(signedRequest.url, {
		method,
		headers,
		body
	});

	if (results.status !== 200) {
		throw new Error(await results.text());
	}

	return results.json();
}

// http://serverless-stack.com/chapters/upload-a-file-to-s3.html
export function getAwsCredentials(userToken) {
	// These credentials are valid till the AWS.config.credentials.expireTime.
	// So we simply check to ensure our credentials are still valid before requesting
	// a new set.
	if (AWS.config.credentials && Date.now() <
		AWS.config.credentials.expireTime - 60000) {

		return;
	}

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
		currentUser.getSession((err, session) => {
			if (err) {
				reject(err);
				return;
			}

			// getSession must be called to authenticate
			// user before calling getUserAttributes
			currentUser.getUserAttributes((err, attributes) => {
				if (err) {
					alert(err);
					return;
				}

				resolve(session.getIdToken().getJwtToken());
			});
		});
	});
}

// https://github.com/aws/amazon-cognito-identity-js
// We must update the AWS Cognito User Pool custom:listings attribute
// when we create a new auction because this is where we are tracking
// the user's total number of auctions.  This number must never be
// less than the actual total number of merchant listings; if it is,
// then auctions will become overwritten when they create new ones.

// export function updateCognitoMerchantListingNumber(currentUser, numAuctions) {
// 	return new Promise((resolve, reject) => {
// 		currentUser.getSession((err, session) => {
// 			if (err) {
// 				reject(err);
// 				return;
// 			}

// 			let attributeList = [];

// 			const customListingsAttribute = {
// 				Name: 'custom:listings',
// 				Value: numAuctions.toString()
// 			};

// 			const attribute = new CognitoUserAttribute(customListingsAttribute);

// 		    attributeList.push(attribute);

// 			// getSession must be called to authenticate
// 			// user before calling getUserAttributes
// 			currentUser.updateAttributes(attributeList, (err, result) => {
// 				if (err) {
// 					alert(err);
// 					reject(err);
// 				}

// 				resolve(result);
// 			});
// 		});
// 	});
// }

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

	return new Promise((resolve, reject) => (
		user.authenticateUser(authenticationDetails, {
			onSuccess: (result) => resolve(result.getIdToken().getJwtToken()),
			onFailure: (err) => reject(err),
		})
	));
}
