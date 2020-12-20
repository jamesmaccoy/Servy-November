const initialState = {
    status: false,

  };
  
  export default function UserReducer(state = initialState, action) {
    switch (action.type) {
      case "USER_STATUS":
        return {
          ...state,
          status: action.payload,
        };
  

      default:
        return state;
    }
  }
  