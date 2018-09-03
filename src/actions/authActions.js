import actionTypes from "./_actionTypes";
import instance from "../config/axios";

export const login = loginData => {
  return dispatch => {
    dispatch({
      type: actionTypes.LOGIN_REQUEST,
      payload: ""
    });

    instance
      .post("auth/login", loginData)
      .then(res => {
        dispatch({
          type: actionTypes.LOGIN_SUCCESS,
          payload: res.data
        });
      })
      .catch(err => {
        dispatch({
          type: actionTypes.LOGIN_ERROR,
          payload: err
        });
      });
  };
};

export const logout = () => {
  return dispatch => {
    dispatch({
      type: actionTypes.LOGOUT,
      payload: false
    });
  };
};
