export default {
	cognito: {
		USER_POOL_ID : 'us-west-2_0qaUPcZji',
		APP_CLIENT_ID : '5ipfum8vk70ueoek214ftrmm90',
		IDENTITY_POOL_ID: 'us-west-2:7782c50d-441b-4495-ab4d-0bdd81b8dcb0',
		REGION: 'us-west-2'
	},
	apiGateway: {
		cards: {
			URL: 'https://1xh0wwfkjf.execute-api.us-west-1.amazonaws.com/prod',
			REGION: 'us-west-1'
		},
		feeds: {
			URL: 'https://wu7nsd6i3a.execute-api.us-west-1.amazonaws.com/prod',
			REGION: 'us-west-1'	
		}
	},
	s3: {
		BUCKET: 'controversy-cards-images',
		URL: 'https://s3-us-west-2.amazonaws.com/controversy-cards-images/',
		REGION: 'us-west-2'
	},
	cloudfront: {
		BUCKET: 'd2rubbqaoavtmn.cloudfront.net',
		REGION: 'us-west-1'
	}
};
