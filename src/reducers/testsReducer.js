import actionTypes from "../actions/_actionTypes";

const initialState = {
  showLoading: false,
  showError: false,
  signedIn: false,
  tests: []
};

const handleGetAllTestsForUserRequest = (state, action) => {
  const newState = { ...state };
  newState.showLoading = true;
  return { ...newState };
};

const handleGetAllTestsForUserSuccess = (state, action) => {
  const newState = { ...state };
  newState.showLoading = false;
  newState.tests = action.data;
  return { ...newState };
};

const handleGetAllTestsForUserError = (state, action) => {
  const newState = { ...state };
  newState.showLoading = false;
  console.log(action.data);
  return { ...newState };
};

export const testsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ALL_TEST_FOR_USER_REQUEST:
      return handleGetAllTestsForUserRequest(state, action);
    case actionTypes.GET_ALL_TEST_FOR_USER_SUCCESS:
      return handleGetAllTestsForUserSuccess(state, action);
    case actionTypes.GET_ALL_TEST_FOR_USER_ERROR:
      return handleGetAllTestsForUserError(state, action);
    default:
      return state;
  }
};

export default testsReducer;
