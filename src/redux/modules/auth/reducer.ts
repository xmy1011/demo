import { AnyAction } from 'redux';
import * as types from "@/redux/mutation-types";
import produce from "immer";
import { AuthState } from '@/redux/interface'

const authState: AuthState = {
  authButtons: {},
}

const auth = (state:AuthState = authState, action: AnyAction) => {
  return produce((state, draftState) => {
    switch(action.type){
      case types.SET_AUTH_BUTTONS:
        draftState.authButtons = action.authButtons;
        break;
      default:
        return draftState;
    }
  })
}

export default auth