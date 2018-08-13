export const INCREMENT_PAGE_LOAD = "INCREMENT_PAGE_LOAD";

export const incrementPages = () => {
	return {
		type: INCREMENT_PAGE_LOAD
	};
};

export const CHANGE_PATH = "CHANGE_PATH";

export const changePath = (path) => {
	return {
		type: CHANGE_PATH,
		values: path
	};
};

export const SCREEN_RESIZE = "SCREEN_RESIZE";

export const screenResize = (width) => {
	return {
		type: SCREEN_RESIZE,
		screenWidth: width
	}
}