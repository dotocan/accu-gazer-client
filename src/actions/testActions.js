import actionTypes from "./_actionTypes";
import instance from "../config/axios";

export const saveTest = testData => {
  return dispatch => {
    dispatch({
      type: actionTypes.POST_TESTS_REQUEST,
      payload: ""
    });

    instance
      .post("tests", testData)
      .then(res => {
        dispatch({
          type: actionTypes.POST_TESTS_SUCCESS,
          data: res.data
        });
      })
      .catch(err => {
        dispatch({
          type: actionTypes.POST_TESTS_ERROR,
          data: err
        });
      });
  };
};
