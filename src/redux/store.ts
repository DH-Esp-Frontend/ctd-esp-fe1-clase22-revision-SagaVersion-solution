import { configureStore } from "@reduxjs/toolkit";
import slice from "./slice";
import createSagaMiddleware from "@redux-saga/core";
import {runSaga} from "./slice";

const saga = createSagaMiddleware();
const store = configureStore({
  reducer: slice,
  middleware:[saga]
});

saga.run(runSaga);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
