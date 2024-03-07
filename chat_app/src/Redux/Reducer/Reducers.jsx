import {
  AUTH_CREATE_FAILURE,
  AUTH_CREATE_SUCCESS,
  AUTH_LOGIN_FAILURE,
  AUTH_LOGIN_SUCCESS,
  USER_STATE_CHANGED,
  CURRENT_USER_DATA,
} from "../Constants";

const initialState = {
  authenticated: false,
  AuthSuccess: {},
  AuthFailure: false,
  LoginSuccess: {},
  LoginFailure: false,
  currentUser: null,
  userChat: null,
};

export default function Reducers(state = initialState, action) {
  switch (action.type) {
    case AUTH_CREATE_SUCCESS:
      return {
        ...state,
        authenticated: true,
        AuthSuccess: action.payload,
      };
    case AUTH_CREATE_FAILURE:
      return {
        ...state,
        authenticated: false,
        AuthFailure: action.payload,
      };
    case AUTH_LOGIN_SUCCESS:
      return {
        ...state,
        authenticated: true,
        LoginSuccess: action.payload,
      };
    case AUTH_LOGIN_FAILURE:
      return {
        ...state,
        authenticated: false,
        LoginFailure: action.payload,
      };
    case CURRENT_USER_DATA:
      return {
        ...state,
        currentUser: action.payload,
      };

    case USER_STATE_CHANGED:
      return {
        ...state,
        userChat: action.payload,
        // chatId:currentUser.uid>user.uid ?currentUser.uid+user.uid :user.uid+currentUser.uid
      };
    default:
      return {
        ...state,
      };
  }
}
