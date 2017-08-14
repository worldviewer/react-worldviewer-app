// ES7 shim for Object.values
import values from 'object.values';

if (!Object.values) {
    values.shim();
}

const types = {
	SET_USER_TOKEN: 'SET_USER_TOKEN',
	SET_USER_TOKEN_LOADING: 'SET_USER_TOKEN_LOADING',
	UNSET_USER_TOKEN_LOADING: 'UNSET_USER_TOKEN_LOADING',
	SET_TOKEN_FETCH_COMPLETE: 'SET_TOKEN_FETCH_COMPLETE',

	SET_USERNAME: 'SET_USERNAME',
	SET_PASSWORD: 'SET_PASSWORD',
	SET_PASSWORD_CONFIRMATION: 'SET_PASSWORD_CONFIRMATION',
	SET_CONFIRMATION_CODE: 'SET_CONFIRMATION_CODE',

	SET_USERNAME_VALIDATION: 'SET_USERNAME_VALIDATION',
	SET_PASSWORD_VALIDATION: 'SET_PASSWORD_VALIDATION',
	SET_CONFIRM_PASSWORD_VALIDATION: 'SET_CONFIRM_PASSWORD_VALIDATION',

	CLEAR_USER: 'CLEAR_USER',
	SET_NEW_USER: 'SET_NEW_USER',

	SET_ALERT: 'SET_ALERT',
	DISMISS_ALERT: 'DISMISS_ALERT',

	CLICK_ICON: 'CLICK_ICON',
	OPEN_MENU: 'OPEN_MENU',
	CLOSE_MENU: 'CLOSE_MENU',

	FETCH_CARD_REQUEST: 'FETCH_CARD_REQUEST',
	FETCH_CARD_ERROR: 'FETCH_CARD_ERROR',
	FETCH_CARD_SUCCESS: 'FETCH_CARD_SUCCESS',

	SET_HEIGHT: 'SET_HEIGHT',
	SET_LOADED: 'SET_LOADED',
	SET_DISCOURSE_LEVEL: 'SET_DISCOURSE_LEVEL',
	SET_CARDSTACK_LEVEL: 'SET_CARDSTACK_LEVEL',
	SET_FEEDSTACK_LEVEL: 'SET_FEEDSTACK_LEVEL',

	ACTIVATE_MAIN_STACK_OVERLAY: 'ACTIVATE_MAIN_STACK_OVERLAY',
	DEACTIVATE_MAIN_STACK_OVERLAY: 'DEACTIVATE_MAIN_STACK_OVERLAY',
	SET_MAIN_STACK_OVERLAY_SIZE: 'SET_MAIN_STACK_OVERLAY_SIZE',

	SET_CARD_SLUGS: 'SET_CARD_SLUGS',
	SET_SLUGS_LOADING: 'SET_SLUGS_LOADING',
	UNSET_SLUGS_LOADING: 'UNSET_SLUGS_LOADING',

	SET_CARD_DATA: 'SET_CARD_DATA',
	SET_CARD_DATA_LOADING: 'SET_CARD_DATA_LOADING',
	UNSET_CARD_DATA_LOADING: 'UNSET_CARD_DATA_LOADING',

	ENABLE_MAINSTACK_SWIPEABLE: 'ENABLE_MAINSTACK_SWIPEABLE',
	DISABLE_MAINSTACK_SWIPEABLE: 'DISABLE_MAINSTACK_SWIPEABLE'
};

const initialState = {
	user: {
		token: null,
		tokenLoading: true,
		tokenFetchComplete: false,
		username: '',
		password: '',
		confirmPassword: '',
		confirmationCode: '',
		newUser: null
	},

	validations: {
		password: null,
		username: null,
		confirmPassword: null
	},

	notification: {
		active: false,
		title: '',
		message: ''
	},

	discourse: {
		level: 0,
		overlay: false,
		swipeDirection: 'up',
		isFullScreen: false,
		timeoutId: null
	},

	cardStack: {
		level: 2,
		swipeDirection: 'right'
	},

	feedStack: {
		level: 0,
		swipeDirection: 'right'
	},

	mainStack: {
		swipeable: true
	},

	slugs: {
		hash: {},
		slugsLoading: true
	},

	card: {
		data: {},
		cardLoading: true
	},

	search: {
		query: ''
	},

	base: {
		api: 'https://czlxg9sj34.execute-api.us-east-1.amazonaws.com/dev/cards/',
		background: 'https://controversy-cards-assets.s3.amazonaws.com/',
		overlay: 'https://controversy-cards-assets.s3.amazonaws.com/'
	},

	feeds: {
		worldview: [],
		model: [],
		propositional: [],
		conceptual: [],
		narrative: []
	}
};

export const setUserToken = (token) => {
	return {
		type: types.SET_USER_TOKEN,
		token
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

export const setTokenFetchComplete = () => {
	return {
		type: types.SET_TOKEN_FETCH_COMPLETE
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

export const setAlert = (title, message) => {
	return {
		type: types.SET_ALERT,
		title,
		message
	};
};

export const dismissAlert = () => {
	return {
		type: types.DISMISS_ALERT
	};
};

export const openMenu = () => {
	return {
		type: types.OPEN_MENU
	};
};

export const closeMenu = () => {
	return {
		type: types.CLOSE_MENU
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

export const setFeedStackLevel = (level, direction) => {
	return {
		type: types.SET_FEEDSTACK_LEVEL,
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

export const setCardData = (card) => {
	return {
		type: types.SET_CARD_DATA,
		card
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

export default (state = initialState, action) => {
	switch(action.type) {
		case types.SET_USER_TOKEN:
			return {
				...state,
				user: {
					...state.user,
					token: action.token
				}
			};

		case types.SET_USER_TOKEN_LOADING:
			return {
				...state,
				user: {
					...state.user,
					tokenLoading: true
				}
			};

		case types.UNSET_USER_TOKEN_LOADING:
			return {
				...state,
				user: {
					...state.user,
					tokenLoading: false
				}
			};

		case types.SET_TOKEN_FETCH_COMPLETE:
			return {
				...state,
				user: {
					...state.user,
					tokenFetchComplete: true
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

		case types.SET_ALERT:
			return {
				...state,
				notification: {
					...state.notification,
					active: true,
					title: action.title,
					message: action.message
				}
			};

		case types.DISMISS_ALERT:
			return {
				...state,
				notification: {
					...state.notification,
					active: false,
					title: '',
					message: ''
				}
			};

		case types.OPEN_MENU:
			return {
				...state,
				menu: {
					...state.menu,
					open: true
				}
			};

		case types.CLOSE_MENU:
			return {
				...state,
				menu: {
					...state.menu,
					open: false
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

		case types.SET_FEEDSTACK_LEVEL:
			return {
				...state,
				feedStack: {
					...state.feedStack,
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
			}

		case types.SET_CARD_SLUGS:
			return {
				...state,
				slugs: {
					...state.slugs,
					hash: action.slugsHash
				}
			}

		case types.SET_SLUGS_LOADING:
			return {
				...state,
				slugs: {
					...state.slugs,
					slugsLoading: true
				}
			}

		case types.UNSET_SLUGS_LOADING:
			return {
				...state,
				slugs: {
					...state.slugs,
					slugsLoading: false
				}
			}

		case types.SET_CARD_DATA:
			return {
				...state,
				card: {
					...state.card,
					data: {
						...action.card
					}
				}
			}

		case types.SET_CARD_DATA_LOADING:
			return {
				...state,
				card: {
					...state.card,
					cardLoading: true
				}
			}

		case types.UNSET_CARD_DATA_LOADING:
			return {
				...state,
				card: {
					...state.card,
					cardLoading: false
				}
			}

		case types.ENABLE_MAINSTACK_SWIPEABLE:
			return {
				...state,
				mainStack: {
					...state.mainStack,
					swipeable: true
				}
			}

		case types.DISABLE_MAINSTACK_SWIPEABLE:
			return {
				...state,
				mainStack: {
					...state.mainStack,
					swipeable: false
				}
			}

		default:
			return state;
	}
};
