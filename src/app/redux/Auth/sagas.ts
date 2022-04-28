import { all, put, takeLatest } from "redux-saga/effects";
import { actionLogin } from "./slices";
import { appLoginRequest } from "./actions";
import { APP_LOGIN_REQUEST, APP_LOGOUT_REQUEST } from "./constants";

function* handleAppLogin(action: ReturnType<typeof appLoginRequest>) {
  yield put(actionLogin(action.payload));
}

function* handleAppLogOut(action: ReturnType<typeof appLoginRequest>) {
  yield put(actionLogin(action.payload));
}

export default all([
  takeLatest(APP_LOGIN_REQUEST, handleAppLogin),
  takeLatest(APP_LOGOUT_REQUEST, handleAppLogOut),
]);
