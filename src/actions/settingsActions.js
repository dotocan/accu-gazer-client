import actionTypes from "./_actionTypes";
import instance from "../config/axios";
import * as errorHandlerActions from './errorHandlerActions';

export const getSettings = () => {
  return dispatch => {
    dispatch({
        type: actionTypes.GET_SETTINGS_REQUEST,
        payload: ""
    });

    instance
      .get("settings")
      .then(res => {
        dispatch({
          type: actionTypes.GET_SETTINGS_SUCCESS,
          payload: res.data
        });
      })
      .catch(err => {
        console.log("Error: " + err);
        dispatch(errorHandlerActions.handleHTTPError(err));
      });
  };
};
