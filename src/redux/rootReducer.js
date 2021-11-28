import { combineReducers } from "redux";
import { machineStatusReducer,machinesReducer } from "./reducer";

/**
 * Root Reducer which combines all the reducers used
 * 
 */
const rootReducer = combineReducers({
   machineStatusReducer,
   machinesReducer

});

export default rootReducer;
