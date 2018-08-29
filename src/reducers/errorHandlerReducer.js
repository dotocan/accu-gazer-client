import initialState from './_initialState';
import actionTypes from '../actions/_actionTypes';

const handleError = (state, action) => {
    console.log(action);
    return { ...state };
}

const errorHandlerReducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.HTTP_ERROR:
            return handleError(state, action);
        default: 
            return state;
    }
}

export default errorHandlerReducer;