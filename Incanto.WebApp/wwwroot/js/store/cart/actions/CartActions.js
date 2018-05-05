import { ADD_TO_CART, UPDATE_CART, REMOVE_ITEM, CLEAR_CART } from "../constants/ActionTypes";

export function addToCart(payload) {
	return {
		type: ADD_TO_CART,
		payload: payload
	}
}

export function updateCart(payload) {
	return {
		type: UPDATE_CART,
		payload: payload
	}
}

export function removeItem(payload) {
	return {
		type: REMOVE_ITEM,
		payload: payload
	}
}

export function clearCart() {
	return {
		type: CLEAR_CART,
		payload: []
	}
}
