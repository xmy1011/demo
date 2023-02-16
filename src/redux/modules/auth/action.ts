import * as types from "@/redux/mutation-types";

//  setAuthButton
export const setAuthButtons = (authButtons: {[propName: string]: any}) => ({
  type: types.SET_AUTH_BUTTONS,
  authButtons
})