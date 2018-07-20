import actionTypes from "./_actionTypes";
import instance from "../config/axios";
import * as errorHandlerActions from './errorHandlerActions';

export const saveTest = testData => {
  return dispatch => {
    instance
      .post("api/test", testData)
      .then(res => {
        dispatch({
          type: actionTypes.TEST_RESULTS_POST_SUCCESS,
          data: res.data
        });
      })
      .catch(err => {
        dispatch(errorHandlerActions.handleHTTPError(err));
      });
  };
};

