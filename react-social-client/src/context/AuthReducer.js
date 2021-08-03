// check AuthActions.js file
const AuthReducer = (state, action) => {
          switch (action.type) {
                    case "LOGIN_START": 
                              return {
                                        user: null,
                                        isFetching: true,
                                        errror: false,
                              }

                    case "LOGIN_SUCCESS": 
                              return {
                                        user: action.payload,
                                        isFetching: false,
                                        errror: false,
                              }

                    case "LOGIN_FAILURE": 
                              return {
                                        user: null,
                                        isFetching: false,
                                        errror: action.payload,
                              }

                    default:
                              return state
          }
}

export default AuthReducer;