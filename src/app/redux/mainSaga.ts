import { all } from "redux-saga/effects";
import AuthSaga from "./Auth/sagas";

export default function* rootSaga() {
  yield all([AuthSaga]);
}
