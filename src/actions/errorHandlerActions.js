import actionTypes from "./_actionTypes";

const execute404Handler = (error) => {
  return {
    type: actionTypes.HTTP_404,
    error: error
  }
}

const execute500Handler = (error) => {
  return {
    type: actionTypes.HTTP_500,
    error: error
  }
}

const executeOtherErrorHandler = (error) => {
  return {
    type: actionTypes.HTTP_OTHER,
    error: error
  }
}

export const handleHTTPError = (error) => {
  if(error.response.status === 404) {
    return execute404Handler(error);
  } else if (error.response.status = 500) {
    return execute500Handler(error);
  } else {
    return executeOtherErrorHandler(error);
  }
}
