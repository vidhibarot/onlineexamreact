import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { changeState } from './reducer'
import persistReducer from "redux-persist/lib/persistReducer";
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: 'root',
    storage,
}

const rootReducer = combineReducers({
    user: changeState,
});
const persistedReducer = persistReducer(persistConfig, rootReducer)


const store = configureStore({
    reducer: persistedReducer

})

export default store


