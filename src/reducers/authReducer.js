import initialState from './_initialState';
import actionTypes from '../actions/_actionTypes';
import keys from '../config/keys';

const handleLoginRequest = (state, action) => {
    const newState = { ...state }
    newState.auth.showLoading = true;
    return { ...newState }
}

const handleLoginSuccess = (state, action) => {
    localStorage.setItem(keys.storageTokenKey, action.payload.token);
   
    const newState = { ...state }
    newState.auth.showLoading = false;
    newState.auth.signedIn = true;
    newState.auth.user = action.payload.user;

    console.log(newState);

    return { ...newState }
}

const handleLoginError = (state, action) => {
    const newState = { ...state }
    newState.auth.showLoading = false;
    return { ...newState }
}

export const authReducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.LOGIN_REQUEST:
            return handleLoginRequest(state, action);
        case actionTypes.LOGIN_SUCCESS:
            console.log("Login success: " + JSON.stringify(action.payload));
            return handleLoginSuccess(state, action);
        case actionTypes.LOGIN_FAILED:
            console.log("Login failed: " + JSON.stringify(action.payload));
            return handleLoginError(state, action);
        default:
            return state;
    }
}

export default authReducer;