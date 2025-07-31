import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Patient } from "./patientType";

interface PatientState {
  patients: Patient[];
  shouldRefetchPatients: boolean;
  selectedPatient: Patient | null;
}

const initialState: PatientState = {
  patients: [],
  shouldRefetchPatients: false,
  selectedPatient: null,
};

const patientSlice = createSlice({
  name: "patient",
  initialState,
  reducers: {
    setPatients: (state, action: PayloadAction<Patient[]>) => {
      state.patients = action.payload;
    },
    addPatient: (state, action: PayloadAction<Patient>) => {
      state.patients.push(action.payload);
      state.shouldRefetchPatients = true;
    },
    updatePatient: (state, action: PayloadAction<Patient>) => {
      const index = state.patients.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) state.patients[index] = action.payload;
      state.shouldRefetchPatients = true;
    },
    deletePatient: (state, action: PayloadAction<number | string>) => {
      state.patients = state.patients.filter((p) => p.id !== action.payload);
      state.shouldRefetchPatients = true;
    },
    clearShouldRefetch: (state) => {
      state.shouldRefetchPatients = false;
    },
    setSelectedPatient: (state, action: PayloadAction<Patient | null>) => {
      state.selectedPatient = action.payload;
    },
  },
});

export const {
  setPatients,
  addPatient,
  updatePatient,
  deletePatient,
  setSelectedPatient,
  clearShouldRefetch,
} = patientSlice.actions;

export default patientSlice.reducer;
