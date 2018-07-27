import actionTypes from "./_actionTypes";
import instance from "../config/axios";
import keys from '../config/keys';
//import * as errorHandlerActions from './errorHandlerActions';

const token = 'Bearer ' + localStorage.getItem(keys.storageTokenKey);

export const getSettings = () => {
  return dispatch => {
    dispatch({
        type: actionTypes.GET_SETTINGS_REQUEST,
        payload: ""
    });

    instance
      .get("settings", { headers: {'Authorization': token} })
      .then(res => {
        dispatch({
          type: actionTypes.GET_SETTINGS_SUCCESS,
          payload: res.data
        });
      })
      .catch(err => {
        console.log("Error: " + err);
        //dispatch(errorHandlerActions.handleHTTPError(err));
      });
  };
};
