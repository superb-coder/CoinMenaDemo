import { APP_LOGIN_REQUEST } from "./constants";

export const appLoginRequest = (email: string, password: string) => ({
  type: APP_LOGIN_REQUEST,
  payload: { email, password },
});
