const initialState = {
  user: {},
  isLoggedIn: false,
};

const LOGIN_USER = "LOGIN_USER";
const LOGOUT_USER = "LOGOUT_USER";
const SET_USER = "SET_USER";

export function loginUser(user) {
  return {
    type: LOGIN_USER,
    payload: user,
  };
}
export function logoutUser() {
  return {
    type: LOGOUT_USER,
    payload: initialState,
  };
}

export function setUser(userObj) {
  console.log("userObj:", userObj);

  return {
    type: SET_USER,
    payload: { ...userObj },
  };
}

export default function (state = initialState, action) {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, user: action.payload, isLoggedIn: true };
    case LOGOUT_USER:
      return { ...state, ...action.payload };
    case SET_USER:
      return { ...state, user: action.payload, isLoggedIn: true };
    default:
      return state;
  }
}
