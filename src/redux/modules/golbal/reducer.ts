import { AnyAction } from "redux";
import { GlobalState } from "@/redux/interface";
import produce from "immer";
import * as types from "@/redux/mutation-types";

const globalState:GlobalState = {
  token: "",
  userInfo: ""
}

const global = (state:GlobalState = globalState, action:AnyAction) => 
  produce(state, draftState => {
    console.log(draftState);
    console.log(state);
    
    switch (action.type){
      case types.SET_TOKEN:
        draftState.token = action.token;
        break;
      default:
        return draftState;  
    }
  })

export default global;