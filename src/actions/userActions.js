import actionTypes from "./_actionTypes";
import instance from "../config/axios";

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
        dispatch({
          type: actionTypes.LOGIN_ERROR,
          data: err
        });
      });
  };
};
