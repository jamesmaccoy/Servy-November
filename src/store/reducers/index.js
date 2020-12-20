import { combineReducers } from "redux";
import AuthReducer from "./AuthReducer";
import ServiceReducer from "./ServiceReducer";
import AdminReducer from "./AdminReducer";
import UserReducer from "./UserReducer";
import categoryReducer from "./CategoryReducer";
import ProfileReducer from "./ProfileReducer";
import LocationReducer from "./locationReducer";
export default combineReducers({
  Auth: AuthReducer,
  Service: ServiceReducer,
  Admin: AdminReducer,
  User: UserReducer,
  category: categoryReducer,
  profile: ProfileReducer,
  location: LocationReducer,
});
