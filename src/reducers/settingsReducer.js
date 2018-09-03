import actionTypes from "../actions/_actionTypes";

const initialState = {
  showLoading: false,
  showError: false,
  data: {
    numberOfRectanglesInTest: 0,
    shuffle: false,
    rectangleDuration: 0
  }
};

const handleGetSettingsRequest = (state, action) => {
  const newState = { ...state };
  newState.showLoading = true;
  return { ...newState };
};

const handleGetSettingsSuccess = (state, action) => {
  const newState = { ...state };
  newState.showLoading = false;
  newState.data = action.data;
  return { ...newState };
};

const handleGetSettingsError = (state, action) => {
  const newState = { ...state };
  console.log(action.data)
  newState.showLoading = false;
  return { ...newState };
};

export const settingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_SETTINGS_REQUEST:
      return handleGetSettingsRequest(state, action);
    case actionTypes.GET_SETTINGS_SUCCESS:
      return handleGetSettingsSuccess(state, action);
    case actionTypes.GET_SETTINGS_ERROR:
      return handleGetSettingsError(state, action);
    default:
      return state;
  }
};

export default settingsReducer;
