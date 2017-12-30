
const largeFrom = 900;
const mediumFrom = 600;

/**
 * ScreenFormats: 3 - large; 2 - medium; 1 - small
 */
export default class DesignService {
	static isLarge() {
		return window.innerWidth > largeFrom;
	}
	static isSmall() {
		return window.innerWidth < mediumFrom;
	}
	static onChangedToLarge(func) {
		if (func in DesignService.ChangedToLarge) {
		} else {
			DesignService.ChangedToLarge.push(func);
		}
	}
	static onChangedToMedium(func) {
		if (func in DesignService.ChangedToMedium) {
		} else {
			DesignService.ChangedToMedium.push(func);
		}
	}
	static onChangedToSmall(func) {
		if (func in DesignService.ChangedToSmall && func !== undefined) {
		} else {
			DesignService.ChangedToSmall.push(func);
		}
	}

	static raiseEvent(array) {
		for (let i = 0; i < array.length; i++) {
			array[i]();
		}
	}

	static handleChangeWidth(width) {
		if (width > largeFrom) {
			DesignService.ScreenFormat = 3;
			DesignService.raiseEvent(DesignService.ChangedToLarge);
		}
		if (width > mediumFrom && width < largeFrom) {
			DesignService.ScreenFormat = 2;
			DesignService.raiseEvent(DesignService.ChangedToMedium);
		}
		if (width < mediumFrom) {
			DesignService.ScreenFormat = 1;
			DesignService.raiseEvent(DesignService.ChangedToSmall);
		}
	}

	static _init() {
		DesignService.ChangedToLarge = [];
		DesignService.ChangedToMedium = [];
		DesignService.ChangedToSmall = [];
		window.onresize = function (event) {
			DesignService.handleChangeWidth(event.target.innerWidth);
		};
	}
};