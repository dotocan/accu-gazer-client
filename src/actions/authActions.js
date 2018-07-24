import actionTypes from "./_actionTypes";
import instance from "../config/axios";
import * as errorHandlerActions from './errorHandlerActions';

export const updateLoginForm = (newLoginData) => {
  
} 

export const login = loginData => {
  return dispatch => {
    instance
      .post("auth/login", loginData)
      .then(res => {
        dispatch({
          type: actionTypes.LOGIN_SUCCESS,
          data: res.data
        });
      })
      .catch(err => {
        dispatch(errorHandlerActions.handleHTTPError(err));
      });
  };
};

