// ES7 shim for Object.values
import values from 'object.values';

if (!Object.values) {
    values.shim();
}

const types = {
	SET_USER_TOKEN: 'SET_USER_TOKEN',
	SET_USER_TOKEN_LOADING: 'SET_USER_TOKEN_LOADING',
	UNSET_USER_TOKEN_LOADING: 'UNSET_USER_TOKEN_LOADING',

	SHOW_BUBBLE: 'SHOW_BUBBLE',
	SPIN_BUBBLE_NUMBER: 'SPIN_BUBBLE_NUMBER',
	DISABLE_SPIN_BUBBLE_NUMBERS: 'DISABLE_SPIN_BUBBLE_NUMBERS',
	SET_SPIN_BUBBLE_NUMBER_TIMEOUT: 'SET_SPIN_BUBBLE_NUMBER_TIMEOUT',
	DEACTIVATE_BUBBLE: 'DEACTIVATE_BUBBLE',
	CLICK_BUBBLE: 'CLICK_BUBBLE',

	CLICK_ICON: 'CLICK_ICON',
	OPEN_MENU: 'OPEN_MENU',
	CLOSE_MENU: 'CLOSE_MENU',

	TOGGLE_OVERLAY_STATE: 'TOGGLE_OVERLAY_STATE',
	SHADE_ELEMENTS: 'SHADE_ELEMENTS',
	UNSHADE_ELEMENTS: 'UNSHADE_ELEMENTS',
	RESET_ELEMENT_ZINDEXES: 'RESET_ELEMENT_ZINDEXES',

	NEXT_SLIDE: 'NEXT_SLIDE',
	PREV_SLIDE: 'PREV_SLIDE',

	SET_CURRENT_QUOTE: 'SET_CURRENT_QUOTE',
	SET_CURRENT_QUOTE_ELEMENT: 'SET_CURRENT_QUOTE_ELEMENT',
	SET_CURRENT_QUOTE_TIMER: 'SET_CURRENT_QUOTE_TIMER',
	TOGGLE_QUOTE: 'TOGGLE_QUOTE',
	CLEAR_QUOTE_TIMERS: 'CLEAR_QUOTE_TIMERS',

	FETCH_CARD_REQUEST: 'FETCH_CARD_REQUEST',
	FETCH_CARD_ERROR: 'FETCH_CARD_ERROR',
	FETCH_CARD_SUCCESS: 'FETCH_CARD_SUCCESS',

	SET_HEIGHT: 'SET_HEIGHT',
	SET_LOADED: 'SET_LOADED',
	SET_DISCOURSE_LEVEL: 'SET_DISCOURSE_LEVEL',

	ACTIVATE_SWIPE_OVERLAY: 'ACTIVATE_SWIPE_OVERLAY',
	DEACTIVATE_SWIPE_OVERLAY: 'DEACTIVATE_SWIPE_OVERLAY',
	SET_SWIPE_OVERLAY_SIZE: 'SET_SWIPE_OVERLAY_SIZE'
};

const initialState = {
	user: {
		token: null,
		tokenLoading: true
	},

	base: {
		api: 'https://czlxg9sj34.execute-api.us-east-1.amazonaws.com/dev/cards/',
		background: 'https://controversy-cards-assets.s3.amazonaws.com/',
		overlay: 'https://controversy-cards-assets.s3.amazonaws.com/'
	},

	controls: {
		next: true,
		prev: false
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

	overlays: {
		active: true,
		loaded: false
	},

	slides: {
		current: 0,
		previous: null, // This is necessary for TweenMax transitions
		firsts: {},
		active: false,
		num: 0
	},

	slideshow: [],

	bubbles: { 
		display: Array.from({length:8}, el => false) // Used on component mount
	},

	bubbleNumbers: {
		active: Array.from({length:8}, el => false),
		timeouts: Array.from({length:8}, el => 0)
	},

	quotes: {
		element: null,
		current: 0,
		active: false,
		id: null
	},

	feeds: {
		worldview: [],
		model: [],
		propositional: [],
		conceptual: [],
		narrative: []
	},

	discourse: {
		level: 0,
		overlay: false,
		swipeDirection: 'up',
		isFullScreen: false,
		timeoutId: null
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

export const showBubble = (num) => {
	return {
		type: types.SHOW_BUBBLE,
		num
	};
};

export const spinBubbleNumber = (num) => {
	return {
		type: types.SPIN_BUBBLE_NUMBER,
		num
	};
};

export const disableSpinBubbleNumbers = () => {
	return {
		type: types.DISABLE_SPIN_BUBBLE_NUMBERS
	};
};

export const setSpinBubbleNumberTimeout = (num, timeout) => {
	return {
		type: types.SET_SPIN_BUBBLE_NUMBER_TIMEOUT,
		num,
		timeout
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

export const clickBubble = (num) => {
	return {
		type: types.CLICK_BUBBLE,
		num
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

export const toggleOverlayState = (zoom) => {
	return {
		type: types.TOGGLE_OVERLAY_STATE,
		active: zoom <= 1.1
	};
};

export const shadeElements = (elements, shade) => {
	return {
		type: types.SHADE_ELEMENTS,
		elements,
		shade
	};
};

export const unshadeElements = () => {
	return {
		type: types.UNSHADE_ELEMENTS
	};
};

export const resetElementZindexes = () => {
	return {
		type: types.RESET_ELEMENT_ZINDEXES
	};
};

export const nextSlide = () => {
	return {
		type: types.NEXT_SLIDE
	};
};

export const prevSlide = () => {
	return {
		type: types.PREV_SLIDE
	};
};

export const setCurrentQuote = (current) => {
	return {
		type: types.SET_CURRENT_QUOTE,
		current
	};
};

export const setCurrentQuoteElement = (element) => {
	return {
		type: types.SET_CURRENT_QUOTE_ELEMENT,
		element
	};
};

export const setCurrentQuoteTimer = (id) => {
	return {
		type: types.SET_CURRENT_QUOTE_TIMER,
		id
	};
};

export const toggleQuote = (state) => {
	return {
		type: types.TOGGLE_QUOTE,
		state
	};
};

export const clearQuoteTimers = () => {
	return {
		type: types.CLEAR_QUOTE_TIMERS
	};
};

export const deactivateBubble = () => {
	return {
		type: types.DEACTIVATE_BUBBLE
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
	let controls,
		isEnd,
		isBeginning,
		zindexes;

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
			
		case types.SHOW_BUBBLE:
			let newDisplayState = state.bubbles.display.slice();
			newDisplayState[action.num] = true;

			return {
				...state,
				bubbles: {
					...state.bubbles,
					display: newDisplayState
				}
			};

		case types.SPIN_BUBBLE_NUMBER:
			let newSpinState = Array.from({length:8}, el => false);
			newSpinState[action.num] = true;

			return {
				...state,
				bubbleNumbers: {
					...state.bubbleNumbers,
					active: newSpinState
				}
			};

		case types.DISABLE_SPIN_BUBBLE_NUMBERS:
			const
				noSpin = Array.from({length:8}, el => false),
				noSpinTimeouts = Array.from({length:8}, el => 0);

			return {
				...state,
				bubbleNumbers: {
					...state.bubbleNumbers,
					active: noSpin,
					timeouts: noSpinTimeouts
				}
			};

		case types.SET_SPIN_BUBBLE_NUMBER_TIMEOUT:
			let newSpinTimeoutsState = state.bubbleNumbers.timeouts.slice();
			newSpinTimeoutsState[action.num] = action.timeout;

			return {
				...state,
				bubbleNumbers: {
					...state.bubbleNumbers,
					active: state.bubbleNumbers.active,
					timeouts: newSpinTimeoutsState
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

		case types.CLICK_BUBBLE:
			const current = state.slides.firsts[action.num];

			isEnd = current === state.slideshow.length-1;
			isBeginning = current === 0;

			if (isEnd) {
				controls = {
					next: false,
					prev: true					
				};
			} else if (isBeginning) {
				controls = {
					next: true,
					prev: false
				};
			} else {
				controls = {
					next: true,
					prev: true
				};
			}

			return {
				...state,
				slides: {
					...state.slides,
					active: !state.slides.active,
					current: state.slides.firsts[action.num],
					previous: {
						...state.slideshow[state.slides.current].bubble || null,
						num: state.slides.current
					}
				},
				controls: controls
			};

		case types.DEACTIVATE_BUBBLE:
			// If the user has deactivated the slide, then advance current to next bubble
			let jump = state.slides.current
			const firstSlides = Object.values(state.slides.firsts);

			while (!firstSlides.includes(jump) && jump < state.slides.num) {
				++jump
			}

			return {
				...state,
				slides: {
					...state.slides,
					current: jump-1,
					active: false
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

		case types.TOGGLE_OVERLAY_STATE:
			return {
				...state,
				overlays: {
					...state.overlays,
					active: action.active
				}
			};

		// Note: shade display toggles to none when shade === 0
		case types.SHADE_ELEMENTS:
			zindexes = { ...state.card.zindexes };

			zindexes = { ...state.card.zindexes };

			if (action.elements === 'all') {
				for (let zindex in state.card.zindexes) {
					if (state.card.zindexes.hasOwnProperty(zindex)) {
						zindexes[zindex] = -10;
					}
				}

			// Important: shades all but the passed elements
			} else {
				for (let zindex in state.card.zindexes) {
					if (state.card.zindexes.hasOwnProperty(zindex)) {
						if (action.elements.includes(zindex)) {
							zindexes[zindex] = 10;
						} else {
							zindexes[zindex] = -10;
						}
					}
				}
			}

			return {
				...state,
				card: {
					...state.card,
					zindexes,
					shade: {
						darkness: action.shade,
						zindex: 5
					}
				}
			};

		case types.UNSHADE_ELEMENTS:
			return {
				...state,
				card: {
					...state.card,
					shade: {
						...state.card.shade,
						darkness: 0
					}
				}
			};

		case types.RESET_ELEMENT_ZINDEXES:
			zindexes = { ...state.card.zindexes };

			for (let zindex in state.card.zindexes) {
				if (state.card.zindexes.hasOwnProperty(zindex)) {
					zindexes[zindex] = 10;
				}
			}

			return {
				...state,
				card: {
					...state.card,
					zindexes,
					shade: {
						...state.card.shade,
						zindex: 0
					}
				}
			};		

		case types.NEXT_SLIDE:
			isEnd = state.slides.current === state.slideshow.length-1;

			const
				next = isEnd ?
				state.slides.current :
				state.slides.current+1;

			controls = isEnd ?
				{
					next: false,
					prev: true
				} :
				{
					next: true,
					prev: true
				};

			return {
				...state,
				slides: {
					...state.slides,
					active: true,
					current: next,
					previous: {
						...state.slideshow[state.slides.current].bubble || null,
						num: state.slides.current
					}
				},
				controls: controls,
				quotes: {
					...state.quotes,
					current: 0
				}
			};

		case types.PREV_SLIDE:
			isBeginning = state.slides.current === 0;

			const
				previous = isBeginning ? 0 :
				state.slides.current-1;

			controls = isBeginning ?
				{
					next: true,
					prev: false
				} :
				{
					next: true,
					prev: true
				};

			return {
				...state,
				slides: {
					...state.slides,
					active: true,
					current: previous,
					previous: {
						...state.slideshow[state.slides.current].bubble || null,
						num: state.slides.current
					}
				},
				controls: controls
			};

		case types.SET_CURRENT_QUOTE:
			return {
				...state,
				quotes: {
					...state.quotes,
					current: action.current
				}
			};

		case types.SET_CURRENT_QUOTE_ELEMENT:
			return {
				...state,
				quotes: {
					...state.quotes,
					element: action.element
				}
			};		

		case types.SET_CURRENT_QUOTE_TIMER:
			return {
				...state,
				quotes: {
					...state.quotes,
					id: action.id
				}
			};

		case types.TOGGLE_QUOTE:
			return {
				...state,
				quotes: {
					...state.quotes,
					active: action.state
				}
			};

		case types.CLEAR_QUOTE_TIMERS:
			return {
				...state,
				quotes: {
					...state.quotes,
					current: 0,
					id: null,
					active: false
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
