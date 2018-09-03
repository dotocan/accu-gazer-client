import actionTypes from "./_actionTypes";
import instance from "../config/axios";

export const saveTest = testData => {
  return dispatch => {
    dispatch({
      type: actionTypes.POST_TESTS_REQUEST,
      data: ""
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

export const getAllTestsForUser = () => {
  return dispatch => {
    dispatch({
      type: actionTypes.GET_ALL_TEST_FOR_USER_REQUEST,
      data: ""
    });

    instance
      .get("tests")
      .then(res => {
        dispatch({
          type: actionTypes.GET_ALL_TEST_FOR_USER_SUCCESS,
          data: res.data
        });
      })
      .catch(err => {
        dispatch({
          type: actionTypes.GET_ALL_TEST_FOR_USER_ERROR,
          data: err
        });
      });
  };
};
