import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorHandlerReducer from './errorHandlerReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    errorHandler: errorHandlerReducer
});

export default rootReducer;