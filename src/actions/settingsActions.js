import actionTypes from "./_actionTypes";
import instance from "../config/axios";

export const getSettings = () => {
  return dispatch => {
    dispatch({
        type: actionTypes.GET_SETTINGS_REQUEST,
        data: ""
    });

    instance
      .get("settings")
      .then(res => {
        dispatch({
          type: actionTypes.GET_SETTINGS_SUCCESS,
          data: res.data
        });
      })
      .catch(err => {
        dispatch({
          type: actionTypes.GET_SETTINGS_ERROR,
          data: err
        });
      });
  };
};
