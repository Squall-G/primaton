import { combineReducers, configureStore } from "@reduxjs/toolkit";
import historyReducer from "./historySlice";
import favouritesReducer from "./favouritesSlice";
import { useDispatch, useSelector } from "react-redux";
import { persistReducer, persistStore } from "redux-persist";
import storageSession from "redux-persist/lib/storage/session";

const persistConfig = {
  key: "root",
  storage: storageSession,
};

const rootReducer = combineReducers({
  history: historyReducer,
  favourites: favouritesReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});
export default store;

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

//Custom Hooks
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
