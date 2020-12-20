const initialState = {
  currentUser: null,
  loading: true,
  signUpState: false,
  admin: '',
  authCheck: true,
  user: null

};

export default function loginReducer(state = initialState, action) {
  switch (action.type) {
    case "SIGNIN_SUCCESS":
      return {   
        ...state,
        currentUser: action.payload,
      };
      case "SIGNUP_SUCCESS":
        return {
          ...state,
          signUpState: action.payload,
        };
      case "LOADING":
        return {
          ...state,
          loading: action.payload,
        };
        case "AUTH_CHECK":
          return {   
            ...state,
            authCheck: action.payload,
          };
    case "SIGNIN_ERROR":
      return {
        ...state,
        loginError: "Login Fail",
      };
      case "CURRENT_USER":
        return {
          ...state,
          user: action.payload,
        };
      case "ADMIN":
        return {
          ...state,
          admin: action.payload,
        };

    default:
      return state;
  }
}
