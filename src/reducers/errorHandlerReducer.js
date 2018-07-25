import initialState from './_initialState';
import actionTypes from '../actions/_actionTypes';

const execute404 = (state, action) => {
    action.props.history.push('/errors/404');
    return { ...state };
}

const execute500 = (state, action) => {
    action.props.history.push('/errors/500');
    return { ...state };
}

const executeOther = (state, action) => {
    action.props.history.push('/errors/other');
    return { ...state };
}

const errorHandlerReducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.HTTP_404:
            return execute404(state, action);
        case actionTypes.HTTP_500:
            return execute500(state, action);
        case actionTypes.HTTP_OTHER:
            return executeOther(state, action);
        default: 
            return state;
    }
}

export default errorHandlerReducer;