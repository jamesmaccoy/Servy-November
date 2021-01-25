const initialState = {
  servicesList: [],
  users: []
};

export default function AdminReducer(state = initialState, action) {
  switch (action.type) {
    case "SERVICES_LIST":
      return {
        ...state,
        servicesList: action.payload,
      };
      case "GET_USERS":
        return {
          ...state,
          users: action.payload,
        };
  

    default:
      return state;
  }
}
