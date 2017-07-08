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

	ACTIVATE_SWIPE_OVERLAY: 'ACTIVATE_SWIPE_OVERLAY',
	DEACTIVATE_SWIPE_OVERLAY: 'DEACTIVATE_SWIPE_OVERLAY',
	SET_SWIPE_OVERLAY_SIZE: 'SET_SWIPE_OVERLAY_SIZE'
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

	base: {
		api: 'https://czlxg9sj34.execute-api.us-east-1.amazonaws.com/dev/cards/',
		background: 'https://controversy-cards-assets.s3.amazonaws.com/',
		overlay: 'https://controversy-cards-assets.s3.amazonaws.com/'
	},

	menu: {
		open: false
	},

	card: {
		id: '58b8f1f7b2ef4ddae2fb8b17',
		height: 0,
		url: '',
		icon: {
			source: '',
			left: '',
			top: '',
			width: ''
		},
		nameLeft: {
			left: '',
			markup: '',
			top: ''
		},
		nameRight: {
			right: '',
			markup: '',
			top: ''
		},
		summary: '',
		type: '',
		graphics: [],
		zindexes: {
			icon: 10,
			bubble0: 10,
			bubble1: 10,
			bubble2: 10,
			bubble3: 10,
			bubble4: 10,
			bubble5: 10,
			bubble6: 10,
			bubble7: 10,
			title: 10,
			summary: 10,
			controls: 10 // Not yet used
		},
		shade: {
			darkness: 0,
			zindex: 0
		}
	},

	urls: {
		api: 'https://czlxg9sj34.execute-api.us-east-1.amazonaws.com/dev/cards/',
		background: 'https://controversy-cards-assets.s3.amazonaws.com/58b8f1f7b2ef4ddae2fb8b17/pyramid_files/',
		overlay: 'https://controversy-cards-assets.s3.amazonaws.com/58b8f1f7b2ef4ddae2fb8b17/assets/',
		icon: 'https://controversy-cards-assets.s3.amazonaws.com/58b8f1f7b2ef4ddae2fb8b17/icon/'
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

export const fetchCardRequest = (id) => {
	return {
		type: types.FETCH_CARD_REQUEST,
		id
	};
};

export const fetchCardError = (error) => {
	return {
		type: types.FETCH_CARD_ERROR,
		error
	};
};

// TODO: Grab zindexes
export const fetchCardSuccess = (data) => {
	let card = {};

	card.nameLeft = data['name']['display']['left'];
	card.nameRight = data['name']['display']['right'];
	card.summary = data['summary'];
	card.type = data['graphic']['type'];
	card.icon = data['graphic']['icon'];
	card.graphics = data['graphic']['overlays']['assets'];
	card.text = data['text']['unicode'];
	card.url = data['gplus']['url'];

	const slideshow = data['graphic']['slideshow'];

	return {
		type: types.FETCH_CARD_SUCCESS,
		card,
		slideshow
	};
};

export function fetchCard(id, url) {
	return dispatch => {
		dispatch(fetchCardRequest(id));

		const cardRequest = new Request(url);

		return fetch(cardRequest)
			.then(response => response.json())
			.then(json => {
				console.log('thunk result: ', json);
				dispatch(fetchCardSuccess(json['body'][0]));
			})
			.catch(error => {
				dispatch(fetchCardError(error));
			});
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

export const activateSwipeOverlay = (timeoutId) => {
	return {
		type: types.ACTIVATE_SWIPE_OVERLAY,
		timeoutId
	};
};

export const deactivateSwipeOverlay = () => {
	return {
		type: types.DEACTIVATE_SWIPE_OVERLAY
	};
};

export const setSwipeOverlaySize = (isFullScreen) => {
	return {
		type: types.SET_SWIPE_OVERLAY_SIZE,
		isFullScreen
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

		case types.FETCH_CARD_ERROR:
			console.log(action.error);
			return state;

		case types.FETCH_CARD_SUCCESS:
			let firsts = {},
				curBubbleNum,
				prevBubbleNum,
				curSlide,
				prevSlide;

			for (var i=1; i<action.slideshow.length; i++) {
				curSlide = action.slideshow[i].bubble;
				prevSlide = action.slideshow[i-1].bubble;
				curBubbleNum = curSlide ? curSlide.number : null;
				prevBubbleNum = prevSlide ? prevSlide.number : null;

				if (curBubbleNum !== null && prevBubbleNum === null) {
					firsts[curBubbleNum] = i;
				}
			}

			return {
				...state, 
				card: {
					...state.card,
					...action.card
				},
				slideshow: action.slideshow,
				slides: {
					...state.slides,
					num: action.slideshow.length,
					firsts: firsts
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

		case types.ACTIVATE_SWIPE_OVERLAY:
			return {
				...state,
				discourse: {
					...state.discourse,
					overlay: true,
					timeoutId: action.timeoutId
				}
			};

		case types.DEACTIVATE_SWIPE_OVERLAY:
			return {
				...state,
				discourse: {
					...state.discourse,
					overlay: false
				}
			};

		case types.SET_SWIPE_OVERLAY_SIZE:
			return {
				...state,
				discourse: {
					...state.discourse,
					isFullScreen: action.isFullScreen
				}
			}

		default:
			return state;
	}
};
