import actionTypes from "./_actionTypes";

export const handleHTTPError = (error) => {
  return {
    type: actionTypes.HTTP_ERROR,
    error: error
  }
}
