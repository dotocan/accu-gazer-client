const initialState = {
  auth: {
    showLoading: false,
    showError: false,
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

  settings: {
    showLoading: false,
    showError: false,
    data: {
      numberOfTests: 0,
      shuffle: false,
      testDurationInSeconds: 0
    }
  },
};

export default initialState;
