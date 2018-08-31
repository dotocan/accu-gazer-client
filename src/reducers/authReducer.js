import actionTypes from "../actions/_actionTypes";
import keys from "../config/keys";

const initialState = {
  showLoading: false,
    showError: false,
    signedIn: false,
    user: {
      id: -1,
      firstName: "",
      lastName: "",
      gender: "",
      dateOfBirth: 0,
      email: "",
      tests: []
    }
}

const handleLoginRequest = (state, action) => {
  const newState = { ...state };
  newState.showLoading = true;
  return { ...newState };
};

const handleLoginSuccess = (state, action) => {
  localStorage.setItem(keys.storageTokenKey, action.payload.token);

  const newState = { ...state };
  newState.showLoading = false;
  newState.signedIn = true;
  newState.user = action.payload.user;

  return { ...newState };
};

const handleLoginError = (state, action) => {
  const newState = { ...state };
  newState.showLoading = false;
  return { ...newState };
};

const handleLogout = (state, action) => {
  localStorage.removeItem(keys.storageTokenKey);

  const newState = { ...state };
  newState.signedIn = false;
  return { ...newState };
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_REQUEST:
      return handleLoginRequest(state, action);
    case actionTypes.LOGIN_SUCCESS:
      return handleLoginSuccess(state, action);
    case actionTypes.LOGIN_ERROR:
      return handleLoginError(state, action);
    case actionTypes.LOGOUT:
      return handleLogout(state, action);
    default:
      return state;
  }
};

export default authReducer;
