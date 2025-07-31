import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "./auth/authSlice";
import patientSlice from "./patient/patientSlice";

const rootReducer = combineReducers({
  auth: authSlice,
  patient: patientSlice,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
