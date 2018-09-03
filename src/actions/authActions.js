import actionTypes from "./_actionTypes";
import instance from "../config/axios";

export const login = loginData => {
  return dispatch => {
    dispatch({
      type: actionTypes.LOGIN_REQUEST,
      data: ""
    });

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

export const logout = () => {
  return dispatch => {
    dispatch({
      type: actionTypes.LOGOUT,
      data: false
    });
  };
};
