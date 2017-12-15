// ES7 shim for Object.values
import values from 'object.values';
import config from './config';

if (!Object.values) {
    values.shim();
}

const types = {
	SET_APP_INTERFACE: 'SET_APP_INTERFACE',

	SET_TOKEN_FETCH_COMPLETE: 'SET_TOKEN_FETCH_COMPLETE',
	SET_CREDENTIALS_FETCH_COMPLETE: 'SET_CREDENTIALS_FETCH_COMPLETE',
	SET_SLUGS_FETCH_COMPLETE: 'SET_SLUGS_FETCH_COMPLETE',

	SET_APP_LOADING: 'SET_APP_LOADING',
	UNSET_APP_LOADING: 'UNSET_APP_LOADING',
	SET_USER_TOKEN_LOADING: 'SET_USER_TOKEN_LOADING',
	UNSET_USER_TOKEN_LOADING: 'UNSET_USER_TOKEN_LOADING',
	SET_SLUGS_LOADING: 'SET_SLUGS_LOADING',
	UNSET_SLUGS_LOADING: 'UNSET_SLUGS_LOADING',
	SET_FEED_DATA_LOADING: 'SET_FEED_DATA_LOADING',
	UNSET_FEED_DATA_LOADING: 'UNSET_FEED_DATA_LOADING',
	SET_FEEDS_DATA_LOADING: 'SET_FEEDS_DATA_LOADING',
	UNSET_FEEDS_DATA_LOADING: 'UNSET_FEEDS_DATA_LOADING',
	SET_CARD_DATA_LOADING: 'SET_CARD_DATA_LOADING',
	UNSET_CARD_DATA_LOADING: 'UNSET_CARD_DATA_LOADING',

	SET_USER_TOKEN: 'SET_USER_TOKEN',

	SET_USERNAME: 'SET_USERNAME',
	SET_PASSWORD: 'SET_PASSWORD',
	SET_PASSWORD_CONFIRMATION: 'SET_PASSWORD_CONFIRMATION',
	SET_CONFIRMATION_CODE: 'SET_CONFIRMATION_CODE',

	SET_NEW_USER_INSTRUCTIONS_STATE: 'SET_NEW_USER_INSTRUCTIONS_STATE',

	SET_USERNAME_VALIDATION: 'SET_USERNAME_VALIDATION',
	SET_PASSWORD_VALIDATION: 'SET_PASSWORD_VALIDATION',
	SET_CONFIRM_PASSWORD_VALIDATION: 'SET_CONFIRM_PASSWORD_VALIDATION',

	CLEAR_USER: 'CLEAR_USER',
	SET_NEW_USER: 'SET_NEW_USER',

	SET_HEIGHT: 'SET_HEIGHT',
	SET_LOADED: 'SET_LOADED',
	SET_DISCOURSE_LEVEL: 'SET_DISCOURSE_LEVEL',
	SET_CARDSTACK_LEVEL: 'SET_CARDSTACK_LEVEL',

	ACTIVATE_MAIN_STACK_OVERLAY: 'ACTIVATE_MAIN_STACK_OVERLAY',
	DEACTIVATE_MAIN_STACK_OVERLAY: 'DEACTIVATE_MAIN_STACK_OVERLAY',
	SET_MAIN_STACK_OVERLAY_SIZE: 'SET_MAIN_STACK_OVERLAY_SIZE',

	SET_CARD_SLUGS: 'SET_CARD_SLUGS',
	SET_CARD_DATA: 'SET_CARD_DATA',
	SET_FEED_DATA: 'SET_FEED_DATA',
	SET_FEEDS_DATA: 'SET_FEEDS_DATA',

	ENABLE_MAINSTACK_SWIPEABLE: 'ENABLE_MAINSTACK_SWIPEABLE',
	DISABLE_MAINSTACK_SWIPEABLE: 'DISABLE_MAINSTACK_SWIPEABLE',

	SHOW_SNACKBAR: 'SHOW_SNACKBAR',

	SET_SEARCH_QUERY: 'SET_SEARCH_QUERY',
	SET_SEARCH_FACET: 'SET_SEARCH_FACET',
	SET_SEARCH_STATE: 'SET_SEARCH_STATE',

	SELECT_FEED: 'SELECT_FEED',
	UNSELECT_FEED: 'UNSELECT_FEED',
	SELECT_FACET: 'SELECT_FACET',
	UNSELECT_FACET: 'UNSELECT_FACET',

	ACTIVATE_FEED_IMAGE: 'ACTIVATE_FEED_IMAGE',
	DEACTIVATE_FEED_IMAGE: 'DEACTIVATE_FEED_IMAGE',
	ACTIVATE_FEED_TEXT: 'ACTIVATE_FEED_TEXT',
	DEACTIVATE_FEED_TEXT: 'DEACTIVATE_FEED_TEXT',
	ACTIVATE_FEED_IMAGE_AND_TEXT: 'ACTIVATE_FEED_IMAGE_AND_TEXT',

	ACTIVATE_DESKTOP_TEXT: 'ACTIVATE_DESKTOP_TEXT',
	DEACTIVATE_DESKTOP_TEXT: 'DEACTIVATE_DESKTOP_TEXT',

	SET_PYRAMID_STYLES: 'SET_PYRAMID_STYLES'
};

const initialState = {
	fetchComplete: {
		credentials: false,
		slugs: false
	},

	loading: {
		app: false,
		token: false,
		slugs: false,
		feed: {
			worldview: false,
			model: false,
			propositional: false,
			conceptual: false,
			narrative: false
		},
		feeds: false,
		card: false
	},

	user: {
		token: null,
		username: '',
		password: '',
		confirmPassword: '',
		confirmationCode: '',
		newUser: null
	},

	instructions: {
		all: true,
		firstHomepageLanding: true,
		firstQuoteResult: true,
		firstControversyCardResult: true,
		firstControversyCard: true,
		firstFeed: true,
		firstQuoteClick: true
	},

	validations: {
		password: null,
		username: null,
		confirmPassword: null
	},

	discourse: {
		level: 0,
		overlay: false,
		swipeDirection: 'up',
		isFullScreen: false,
		timeoutId: null
	},

	cardStack: {
		level: 1,
		swipeDirection: 'right'
	},

	feedStack: {
		worldview: {
			image: false,
			text: false
		},
		model: {
			image: false,
			text: false
		},
		propositional: {
			image: false,
			text: false
		},
		conceptual: {
			image: false,
			text: false
		},
		narrative: {
			image: false,
			text: false
		}
	},

	mainStack: {
		swipeable: true,

		// -1 --> 0, 1, 2, 3, 4 activates this
		// numbers represent discourse level
		selectFeedPopup: -1
	},

	slugs: {
		hash: {}
	},

	card: {
		data: {}
	},

	feed: {
		worldview: {},
		model: {},
		propositional: {},
		conceptual: {},
		narrative: {}
	},

	feeds: {
		worldview: [],
		model: [],
		propositional: [],
		conceptual: [],
		narrative: []
	},

	search: {
		query: '',
		facetCategory: '',
		facetSubCategory: '',
		facets: ''
	},

	searchState: {},

	navbar: {
		facetTrigger: false
	},

	snackbar: {
		message: '',
		duration: 0
	},

	pyramid: {
		styles: {
			backgroundColor: 'black',
			display: 'none',
			width: '100%',
			height: '100vh',
			top: '52px',
			bottom: 0,
			left: 0,
			position: 'fixed',
			right: 0
		}
	},

	app: {
		isMobile: false,
		isDesktop: false,
		isTablet: false,
		isLargest: false
	},

	desktop: {
		text: false
	}
};

export const setAppInterface = (screenWidth) => {
	return {
		type: types.SET_APP_INTERFACE,
		screenWidth
	};
};

export const setTokenFetchComplete = () => {
	return {
		type: types.SET_TOKEN_FETCH_COMPLETE
	};
};

export const setCredentialsFetchComplete = () => {
	return {
		type: types.SET_CREDENTIALS_FETCH_COMPLETE
	};
};

export const setSlugsFetchComplete = () => {
	return {
		type: types.SET_SLUGS_FETCH_COMPLETE
	};
};

export const setAppLoading = () => {
	return {
		type: types.SET_APP_LOADING
	};
};

export const unsetAppLoading = () => {
	return {
		type: types.UNSET_APP_LOADING
	};
};

export const setUserTokenLoading = () => {
	return {
		type: types.SET_USER_TOKEN_LOADING
	};
};

export const unsetUserTokenLoading = () => {
	return {
		type: types.UNSET_USER_TOKEN_LOADING
	};
};

export const setSlugsLoading = () => {
	return {
		type: types.SET_SLUGS_LOADING
	};
};

export const unsetSlugsLoading = () => {
	return {
		type: types.UNSET_SLUGS_LOADING
	};
};

export const setFeedDataLoading = (level) => {
	return {
		type: types.SET_FEED_DATA_LOADING,
		level
	};
};

export const unsetFeedDataLoading = (level) => {
	return {
		type: types.UNSET_FEED_DATA_LOADING,
		level
	};
};

export const setFeedsDataLoading = () => {
	return {
		type: types.SET_FEEDS_DATA_LOADING
	};
};

export const unsetFeedsDataLoading = () => {
	return {
		type: types.UNSET_FEEDS_DATA_LOADING
	};
};

export const setCardDataLoading = () => {
	return {
		type: types.SET_CARD_DATA_LOADING
	};
};

export const unsetCardDataLoading = () => {
	return {
		type: types.UNSET_CARD_DATA_LOADING
	};
};

export const setUserToken = (token) => {
	return {
		type: types.SET_USER_TOKEN,
		token
	};
};

export const setUsername = (username) => {
	return {
		type: types.SET_USERNAME,
		username
	};
};

export const setPassword = (password) => {
	return {
		type: types.SET_PASSWORD,
		password
	};
};

export const setPasswordConfirmation = (confirmPassword) => {
	return {
		type: types.SET_PASSWORD_CONFIRMATION,
		confirmPassword
	};
};

export const setConfirmationCode = (confirmationCode) => {
	return {
		type: types.SET_CONFIRMATION_CODE,
		confirmationCode
	};
};

export const setNewUserInstructionsState = (instructions) => {
	return {
		type: types.SET_NEW_USER_INSTRUCTIONS_STATE,
		instructions
	};
};

export const setUsernameValidation = (validation) => {
	return {
		type: types.SET_USERNAME_VALIDATION,
		validation
	};
};

export const setPasswordValidation = (validation) => {
	return {
		type: types.SET_PASSWORD_VALIDATION,
		validation
	};
};

export const setConfirmPasswordValidation = (validation) => {
	return {
		type: types.SET_CONFIRM_PASSWORD_VALIDATION,
		validation
	};
};

export const clearUser = () => {
	return {
		type: types.CLEAR_USER
	};
};

export const setNewUser = (newUser) => {
	return {
		type: types.SET_NEW_USER,
		newUser
	};
};

export const setHeight = (height) => {
	return {
		type: types.SET_HEIGHT,
		height
	};
};

export const setLoaded = () => {
	return {
		type: types.SET_LOADED
	};
};

export const setDiscourseLevel = (level, direction) => {
	return {
		type: types.SET_DISCOURSE_LEVEL,
		level,
		direction
	};
};

export const setCardStackLevel = (level, direction) => {
	return {
		type: types.SET_CARDSTACK_LEVEL,
		level,
		direction
	};
};

export const activateMainStackOverlay = (timeoutId) => {
	return {
		type: types.ACTIVATE_MAIN_STACK_OVERLAY,
		timeoutId
	};
};

export const deactivateMainStackOverlay = () => {
	return {
		type: types.DEACTIVATE_MAIN_STACK_OVERLAY
	};
};

export const setMainStackOverlaySize = (isFullScreen) => {
	return {
		type: types.SET_MAIN_STACK_OVERLAY_SIZE,
		isFullScreen
	};
};

export const setCardSlugs = (slugsHash) => {
	return {
		type: types.SET_CARD_SLUGS,
		slugsHash
	};
};

export const setCardData = (card) => {
	return {
		type: types.SET_CARD_DATA,
		card
	};
};

export const setFeedData = (feed, level) => {
	return {
		type: types.SET_FEED_DATA,
		feed,
		level
	};
};

export const setFeedsData = (worldview, model, propositional, conceptual, narrative) => {
	return {
		type: types.SET_FEEDS_DATA,
		worldview,
		model,
		propositional,
		conceptual,
		narrative
	};
};

export const enableMainStackSwipeable = () => {
	return {
		type: types.ENABLE_MAINSTACK_SWIPEABLE
	};
};

export const disableMainStackSwipeable = () => {
	return {
		type: types.DISABLE_MAINSTACK_SWIPEABLE
	};
};

export const showSnackbar = (message, duration) => {
	return {
		type: types.SHOW_SNACKBAR,
		message,
		duration
	};
};

export const setSearchQuery = (query) => {
	return {
		type: types.SET_SEARCH_QUERY,
		query
	};
};

// facets is the string version of the other two combined
export const setSearchFacet = (facetCategory, facetSubCategory, facets) => {
	return {
		type: types.SET_SEARCH_FACET,
		facetCategory,
		facetSubCategory,
		facets
	};
};

export const setSearchState = (searchState) => {
	return {
		type: types.SET_SEARCH_STATE,
		searchState
	};
}

export const selectFeed = (discourseLevel) => {
	return {
		type: types.SELECT_FEED,
		discourseLevel
	};
}

export const unselectFeed = () => {
	return {
		type: types.UNSELECT_FEED
	};
}

export const selectFacet = () => {
	return {
		type: types.SELECT_FACET
	};
}

export const unselectFacet = () => {
	return {
		type: types.UNSELECT_FACET
	};
}

export const activateFeedImage = (levelName) => {
	return {
		type: types.ACTIVATE_FEED_IMAGE,
		levelName
	};
}

export const deactivateFeedImage = (levelName) => {
	return {
		type: types.DEACTIVATE_FEED_IMAGE,
		levelName
	};
}

export const activateFeedText = (levelName) => {
	return {
		type: types.ACTIVATE_FEED_TEXT,
		levelName
	};
}

export const deactivateFeedText = (levelName) => {
	return {
		type: types.DEACTIVATE_FEED_TEXT,
		levelName
	};
}

export const activateFeedImageAndText = (levelName) => {
	return {
		type: types.ACTIVATE_FEED_IMAGE_AND_TEXT,
		levelName
	};
}

export const activateDesktopText = () => {
	return {
		type: types.ACTIVATE_DESKTOP_TEXT
	};
}

export const deactivateDesktopText = () => {
	return {
		type: types.DEACTIVATE_DESKTOP_TEXT
	};
}

export const setPyramidStyles = (styles) => {
	return {
		type: types.SET_PYRAMID_STYLES,
		styles
	};
}

export default (state = initialState, action) => {
	switch(action.type) {

		case types.SET_APP_INTERFACE:
			return {
				...state,
				app: {
					...state.app,
					isMobile: action.screenWidth < config.breakpoint.MOBILE,
					isTablet: action.screenWidth < config.breakpoint.TABLET &&
						action.screenWidth > config.breakpoint.MOBILE,
					isDesktop: action.screenWidth > config.breakpoint.MOBILE, // TODO: Switch back to TABLET
					isLargest: action.screenWidth > config.breakpoint.LARGEST
				}
			};

		case types.SET_TOKEN_FETCH_COMPLETE:
			return {
				...state,
				fetchComplete: {
					...state.fetchComplete,
					token: true
				}
			};

		case types.SET_CREDENTIALS_FETCH_COMPLETE:
			return {
				...state,
				fetchComplete: {
					...state.fetchComplete,
					credentials: true
				}
			};

		case types.SET_SLUGS_FETCH_COMPLETE:
			return {
				...state,
				fetchComplete: {
					...state.fetchComplete,
					slugs: true
				}
			};

		case types.SET_APP_LOADING:
			return {
				...state,
				loading: {
					...state.loading,
					app: true
				}
			};

		case types.UNSET_APP_LOADING:
			return {
				...state,
				loading: {
					...state.loading,
					app: false
				}
			};

		case types.SET_USER_TOKEN_LOADING:
			return {
				...state,
				loading: {
					...state.loading,
					token: true
				}
			};

		case types.UNSET_USER_TOKEN_LOADING:
			return {
				...state,
				loading: {
					...state.loading,
					token: false
				}
			};

		case types.SET_SLUGS_LOADING:
			return {
				...state,
				loading: {
					...state.loading,
					slugs: true
				}
			};

		case types.UNSET_SLUGS_LOADING:
			return {
				...state,
				loading: {
					...state.loading,
					slugs: false
				}
			};

		case types.SET_FEED_DATA_LOADING:
			return {
				...state,
				loading: {
					...state.loading,
					feed: {
						...state.loading.feed,
						[action.level]: true
					}
				}
			};

		case types.UNSET_FEED_DATA_LOADING:
			return {
				...state,
				loading: {
					...state.loading,
					feed: {
						...state.loading.feed,
						[action.level]: false
					}
				}
			};

		case types.SET_FEEDS_DATA_LOADING:
			return {
				...state,
				loading: {
					...state.loading,
					feeds: true
				}
			};

		case types.UNSET_FEEDS_DATA_LOADING:
			return {
				...state,
				loading: {
					...state.loading,
					feeds: false
				}
			};

		case types.SET_CARD_DATA_LOADING:
			return {
				...state,
				loading: {
					...state.loading,
					card: true
				}
			};

		case types.UNSET_CARD_DATA_LOADING:
			return {
				...state,
				loading: {
					...state.loading,
					card: false
				}
			};

		case types.SET_USER_TOKEN:
			return {
				...state,
				user: {
					...state.user,
					token: action.token
				}
			};

		case types.SET_USERNAME:
			return {
				...state,
				user: {
					...state.user,
					username: action.username,
				}
			};

		case types.SET_PASSWORD:
			return {
				...state,
				user: {
					...state.user,
					password: action.password,
				}
			};

		case types.SET_PASSWORD_CONFIRMATION:
			return {
				...state,
				user: {
					...state.user,
					confirmPassword: action.confirmPassword
				}
			};

		case types.SET_CONFIRMATION_CODE:
			return {
				...state,
				user: {
					...state.user,
					confirmationCode: action.confirmationCode
				}
			};

		case types.SET_NEW_USER_INSTRUCTIONS_STATE:
			return {
				...state,
				instructions: action.instructions
			};

		case types.SET_USERNAME_VALIDATION:
			return {
				...state,
				validations: {
					...state.validations,
					username: action.validation
				}
			};

		case types.SET_PASSWORD_VALIDATION:
			return {
				...state,
				validations: {
					...state.validations,
					password: action.validation
				}
			};

		case types.SET_CONFIRM_PASSWORD_VALIDATION:
			return {
				...state,
				validations: {
					...state.validations,
					confirmPassword: action.validation
				}
			};

		case types.CLEAR_USER:
			return {
				...state,
				user: {
					...state.user,
					username: '',
					password: ''
				}
			};

		case types.SET_NEW_USER:
			return {
				...state,
				user: {
					...state.user,
					newUser: action.newUser
				}
			};

		case types.SET_HEIGHT:
			return {
				...state,
				card: {
					...state.card,
					height: action.height
				}
			};

		case types.SET_LOADED:
			return {
				...state,
				overlays: {
					...state.overlays,
					loaded: true
				}
			};

		case types.SET_DISCOURSE_LEVEL:
			return {
				...state,
				discourse: {
					...state.discourse,
					level: action.level,
					swipeDirection: action.direction
				}
			};

		case types.SET_CARDSTACK_LEVEL:
			return {
				...state,
				cardStack: {
					...state.cardStack,
					level: action.level,
					swipeDirection: action.direction
				}
			};

		case types.ACTIVATE_MAIN_STACK_OVERLAY:
			return {
				...state,
				discourse: {
					...state.discourse,
					overlay: true,
					timeoutId: action.timeoutId
				}
			};

		case types.DEACTIVATE_MAIN_STACK_OVERLAY:
			return {
				...state,
				discourse: {
					...state.discourse,
					overlay: false
				}
			};

		case types.SET_MAIN_STACK_OVERLAY_SIZE:
			return {
				...state,
				discourse: {
					...state.discourse,
					isFullScreen: action.isFullScreen
				}
			};

		case types.SET_CARD_SLUGS:
			return {
				...state,
				slugs: {
					...state.slugs,
					hash: action.slugsHash
				}
			};

		case types.SET_CARD_DATA:
			return {
				...state,
				card: {
					...state.card,
					data: {
						...action.card
					}
				}
			};

		case types.SET_FEED_DATA:
			return {
				...state,
				feed: {
					...state.feed,
					[action.level]: action.feed
				}
			};

		case types.SET_FEEDS_DATA:
			return {
				...state,
				feeds: {
					...state.feeds,
					worldview: action.worldview,
					model: action.model,
					propositional: action.propositional,
					conceptual: action.conceptual,
					narrative: action.narrative
				}
			};

		case types.ENABLE_MAINSTACK_SWIPEABLE:
			return {
				...state,
				mainStack: {
					...state.mainStack,
					swipeable: true
				}
			};

		case types.DISABLE_MAINSTACK_SWIPEABLE:
			return {
				...state,
				mainStack: {
					...state.mainStack,
					swipeable: false
				}
			};
			
		case types.SHOW_SNACKBAR:
			return {
				...state,
				snackbar: {
					...state.snackbar,
					message: action.message,
					duration: action.duration
				}
			};

		case types.SET_SEARCH_QUERY:
			return {
				...state,
				search: {
					...state.search,
					query: action.query
				}
			};

		case types.SET_SEARCH_FACET:
			return {
				...state,
				search: {
					...state.search,
					facetCategory: action.facetCategory,
					facetSubCategory: action.facetSubCategory,
					facets: action.facets
				}
			};

		case types.SET_SEARCH_STATE:
			return {
				...state,
				searchState: action.searchState
			};

		case types.SELECT_FEED:
			return {
				...state,
				mainStack: {
					...state.mainStack,
					selectFeedPopup: action.discourseLevel
				}
			};

		case types.UNSELECT_FEED:
			return {
				...state,
				mainStack: {
					...state.mainStack,
					selectFeedPopup: -1
				}
			};

		case types.SELECT_FACET:
			return {
				...state,
				navbar: {
					...state.navbar,
					facetTrigger: true
				}
			};

		case types.UNSELECT_FACET:
			return {
				...state,
				navbar: {
					...state.navbar,
					facetTrigger: false
				}
			};

		case types.ACTIVATE_FEED_IMAGE:
			return {
				...state,
				feedStack: {
					...state.feedStack,
					[action.levelName]: {
						...state.feedStack[action.levelName],
						image: true
					}
				}
			};

		case types.DEACTIVATE_FEED_IMAGE:
			return {
				...state,
				feedStack: {
					...state.feedStack,
					[action.levelName]: {
						...state.feedStack[action.levelName],
						image: false
					}
				}
			};

		case types.ACTIVATE_FEED_TEXT:
			return {
				...state,
				feedStack: {
					...state.feedStack,
					[action.levelName]: {
						...state.feedStack[action.levelName],
						text: true
					}
				}
			};

		case types.DEACTIVATE_FEED_TEXT:
			return {
				...state,
				feedStack: {
					...state.feedStack,
					[action.levelName]: {
						...state.feedStack[action.levelName],
						text: false
					}
				}
			};

		case types.ACTIVATE_FEED_IMAGE_AND_TEXT:
			return {
				...state,
				feedStack: {
					...state.feedStack,
					[action.levelName]: {
						...state.feedStack[action.levelName],
						text: true,
						image: true
					}
				}
			};

		case types.ACTIVATE_DESKTOP_TEXT:
			return {
				...state,
				desktop: {
					...state.desktop,
					text: true
				}
			};

		case types.DEACTIVATE_DESKTOP_TEXT:
			return {
				...state,
				desktop: {
					...state.desktop,
					text: false
				}
			};

		case types.SET_PYRAMID_STYLES:
			return {
				...state,
				pyramid: {
					...state.pyramid,
					styles: action.styles
				}
			}

		default:
			return state;
	}
};
