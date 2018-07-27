import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorHandlerReducer from './errorHandlerReducer';
import settingsReducer from './settingsReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    settings: settingsReducer,
    errorHandler: errorHandlerReducer
});

export default rootReducer;