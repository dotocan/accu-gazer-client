const initialState = {
    auth: {
        showLoading: false,
        signedIn: false,
        user: {
            id: -1,
            firstName: "",
            lastName: "",
            gender: "",
            dateOfBirth: 0,
            email: "",
            tests: []
        }
    },

    error: {
        code: 0,
        message: "",
        showModal: false
    }
}

export default initialState;