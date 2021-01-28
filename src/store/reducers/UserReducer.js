const initialState = {
  status: false,
  switchLoader: false,
};

export default function UserReducer(state = initialState, action) {
  switch (action.type) {
    case "USER_STATUS":
      return {
        ...state,
        status: action.payload,
      };
    case "SWITCH_LOADER":
      return {
        ...state,
        switchLoader: action.payload,
      };
    default:
      return state;
  }
}
