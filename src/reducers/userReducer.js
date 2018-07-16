import initialState from './initialState';
import actionTypes from '../actions/_actionTypes';
import keys from '../config/keys';

const handleLoginRequest = (state, action) => {
    const newState = { ...state }
    newState.login.showLoading = true;
    return { ...newState }
}

const handleLoginSuccess = (state, action) => {
    // Save JWT to local storage
    localStorage.setItem(keys.storageTokenKey, action.data.tokenString);
    const newState = { ...state }
    newState.login.showLoading = false;
    newState.login.isUserLoggedIn = true;
    return { ...newState }
}

const handleLoginError = (state, action) => {
    const newState = { ...state }
    newState.login.showLoading = false;
    return { ...newState }
}

const loginReducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.LOGIN_REQUEST:
            handleLoginRequest(state, action);
            break;
        case actionTypes.LOGIN_SUCCESS:
            console.log("Login success: " + JSON.stringify(action.data));
            handleLoginSuccess(state, action);
            break;
        case actionTypes.LOGIN_FAILED:
            console.log("Login failed: " + JSON.stringify(action.data));
            handleLoginError(state, action);
            break;
        default:
            return state;
    }
}

export default loginReducer;