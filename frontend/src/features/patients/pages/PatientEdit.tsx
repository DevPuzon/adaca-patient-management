import { useQuery } from '@apollo/client';
import { useParams, useNavigate } from 'react-router-dom';
import PatientForm from '../components/PatientForm';
import { GET_PATIENT } from '@/graphql/mutations/patients/patientQuery';
import { useGraphqlMutation } from '@/lib/hooks/useGraphqlMutation';
import { UPDATE_PATIENT } from '@/graphql/mutations/patients/patientMutation';
import { updatePatient } from '@/store/patient/patientSlice';
import type { Patient } from '@/store/patient/patientType';
import { useDispatch } from 'react-redux';

export default function PatientEdit() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data, loading: loadingQuery } = useQuery(GET_PATIENT, {
    variables: { id: Number(id) },
  });

  const { execute: update, loading } = useGraphqlMutation({
    mutation: UPDATE_PATIENT,
    onSuccess: () => navigate('/patients'),
  });

  const handleSubmit = async (formData: Patient) => {
    await update({ variables: { data: { ...formData, id: Number(id) } } });
    dispatch(updatePatient(formData));
  };

  if (loadingQuery || !data) return <p>Loading patient...</p>;

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Edit Patient</h2>
      <PatientForm
        onSubmit={handleSubmit}
        initialData={data.findOnePatient}
        loading={loading}
      />
    </div>
  );
}
