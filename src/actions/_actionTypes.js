const actionTypes = {
    REGISTER_REQUEST: "REGISTER_REQUEST",
    REGISTER_SUCCESS: "REGISTER_SUCCESS",
    REGISTER_ERROR: "REGISTER_ERROR",

    LOGIN_REQUEST: "LOGIN_REQUEST",
    LOGIN_SUCCESS: "LOGIN_SUCCESS",
    LOGIN_ERROR: "LOGIN_ERROR",

    LOGOUT: "LOGOUT",

    GET_SETTINGS_REQUEST: "GET_SETTINGS_REQUEST",
    GET_SETTINGS_SUCCESS: "GET_SETTINGS_SUCCESS",
    GET_SETTINGS_ERROR: "GET_SETTINGS_ERROR",

    POST_TESTS_REQUEST: "POST_TESTS_REQUEST",
    POST_TESTS_SUCCESS: "POST_TESTS_SUCCESS",
    POST_TESTS_ERROR: "POST_TESTS_ERROR",

    HTTP_404: "HTTP_404",
    HTTP_500: "HTTP_500",
    HTTP_OTHER: "HTTP_OTHER",
}

export default actionTypes;