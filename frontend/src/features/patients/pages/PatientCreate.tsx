import { useNavigate } from "react-router-dom";
import PatientForm from "../components/PatientForm";
import { useGraphqlMutation } from "@/lib/hooks/useGraphqlMutation";
import { CREATE_PATIENT } from "@/graphql/mutations/patients/patientMutation";
import { useDispatch } from "react-redux";
import { addPatient } from "@/store/patient/patientSlice";
import type { Patient } from "@/store/patient/patientType";

export default function PatientCreate() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { execute, loading } = useGraphqlMutation({
    mutation: CREATE_PATIENT,
    onSuccess: () => navigate("/patients"),
  });

  const handleSubmit = async (formData: Patient) => {
    await execute({ variables: { data: formData } });
    dispatch(addPatient(formData));
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Add New Patient</h2>
      <PatientForm onSubmit={handleSubmit} loading={loading} />
    </div>
  );
}
