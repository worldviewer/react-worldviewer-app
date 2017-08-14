import DeviceStorage from 'react-device-storage';
import { invokeApig } from './awsLib';

// We need to grab the hash to convert the short-form slugs into their longer
// equivalents, but we don't want to have to ping the API for this every time
// the user hits a new frontend route.  So, we fetch them from the API and
// save them to localStorage each time the user hits the homepage.  Then,
// we reload them from localStorage whenever the Redux store is cleared out
// on route change.  If they're not in localStore, then we fetch.
export async function getSlugs(isHomePage, setCardSlugsHandler, userToken) {
	const storage = await new DeviceStorage().localStorage();
	let slugs;

	if (isHomePage) {
		slugs = await invokeApig( {path: '/controversies'}, userToken);
		storage.save('slugs', slugs);
	} else {
		slugs = await storage.read('slugs');
	}

	if (!isHomePage && !slugs) {
		slugs = await invokeApig( {path: '/controversies'}, userToken);
		storage.save('slugs', slugs);
	}

	setCardSlugsHandler(slugs);
}
