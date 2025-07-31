import { Route } from "react-router-dom";
import PatientList from "@/features/patients/pages/PatientList";
import PatientCreate from "@/features/patients/pages/PatientCreate";
import PatientDetail from "@/features/patients/pages/PatientDetail";
import PatientEdit from "@/features/patients/pages/PatientEdit";

const PatientRoutes = (
  <>
    <Route path="/patients" element={<PatientList />} />
    <Route path="/patients/create" element={<PatientCreate />} />
    <Route path="/patients/:id/edit" element={<PatientEdit />} />
    <Route path="/patients/:id" element={<PatientDetail />} />
  </>
);

export default PatientRoutes;
