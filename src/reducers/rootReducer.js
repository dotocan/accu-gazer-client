import { combineReducers } from 'redux';
import authReducer from './authReducer';
import settingsReducer from './settingsReducer';
import testsReducer from './testsReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    settings: settingsReducer,
    tests: testsReducer
});

export default rootReducer;