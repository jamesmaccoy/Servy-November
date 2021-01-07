const initialState = {
  serviceMessage: false,
  serviceLoading: false,
  services: [],
  categoryFeatures: [],
  serviceProviderInfo: [],
  reviewsList: [],
  userReviewInfo: [],
  loader: false,
  serviceLoader: true,
  uploadData: [],
  deleteService: false,
  userServices: [],
};
export default function ServiceReducer(state = initialState, action) {
  switch (action.type) {
    case "ADD_SERVICE":
      return {
        ...state,
        serviceMessage: action.payload,
      };
    case "UPLOAD_SERVICE":
      return {
        ...state,
        uploadData: action.payload,
      };

    case "SERVICE_LOADING":
      return {
        ...state,
        serviceLoading: action.payload,
      };
    case "SERVICES":
      return {
        ...state,
        services: action.payload,
      };
    case "CATEGORY_FEATURES":
      return {
        ...state,
        categoryFeatures: action.payload,
      };
    case "SERVICE_PROVIDER_INFO":
      return {
        ...state,
        serviceProviderInfo: action.payload,
      };
    case "GET_REVIEWS":
      return {
        ...state,
        reviewsList: action.payload,
      };
    case "USER_REVIEW_INFO":
      return {
        ...state,
        userReviewInfo: action.payload,
      };
    case "LOADER":
      return {
        ...state,
        loader: action.payload,
      };
    case "SERVICE_LOADER":
      return {
        ...state,
        serviceLoader: action.payload,
      };
    case "DELETE_SERVICE":
      return {
        ...state,
        deleteService: action.payload,
      };
    case "USER_SERVICES":
      return {
        ...state,
        userServices: action.payload,
      };

    default:
      return state;
  }
}
