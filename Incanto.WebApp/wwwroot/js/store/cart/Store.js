import { compose, applyMiddleware, createStore } from 'redux';
import { persistStore, persistCombineReducers } from "redux-persist";
import thunkMiddleware from 'redux-thunk';
import cartReducer from "./reducers/CartReducer";
import storage from 'redux-persist/es/storage';

const persistConfig = {
	key: 'cartReducer',
	storage
}

let configStore = function () {
	const reducer = persistCombineReducers(persistConfig, cartReducer);	

	const middleware = applyMiddleware(thunkMiddleware);
	let store = middleware(createStore)(reducer, {});
	//let store = createStore(reducer, {});

	let persistor = persistStore(store);
	return {
		persistor,
		store
	};
};




export default configStore;