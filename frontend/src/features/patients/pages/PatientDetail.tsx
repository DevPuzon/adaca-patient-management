import { useParams } from "react-router-dom";
import { GET_PATIENT } from "@/graphql/mutations/patients/patientQuery";
import { useGraphqlQuery } from "@/lib/hooks/useGraphqlQuery";

import { HiOutlineMail, HiOutlinePhone, HiOutlineUser } from "react-icons/hi";
import { MdCalendarToday } from "react-icons/md";

export default function PatientDetail() {
  const { id } = useParams();
  const { data, loading } = useGraphqlQuery({
    query: GET_PATIENT,
    variables: { id: Number(id) },
    showToastOnError: true,
  });

  if (loading) {
    return (
      <div className="flex items-center gap-3 text-blue-600 animate-pulse p-4">
        <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <span className="text-sm font-medium">Fetching patient details...</span>
      </div>
    );
  }

  if (!data?.findOnePatient) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg">
        <p className="font-medium">Patient not found.</p>
      </div>
    );
  }

  const { findOnePatient: patient } = data;

  return (
    <div className="p-6 space-y-6 max-w-xl mx-auto mt-8">
      <div className="flex items-center gap-4">
        <HiOutlineUser className="w-10 h-10 text-blue-600" />
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            {patient.firstName} {patient.lastName}
          </h2>
          <p className="text-sm text-gray-500">Patient ID: {id}</p>
        </div>
      </div>

      <div className="space-y-3 text-gray-700">
        <div className="flex items-center gap-3">
          <HiOutlineMail className="w-5 h-5" />
          <span className="font-medium">Email:</span>
          <span>
            {patient.email || <em className="text-gray-400">Not provided</em>}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <HiOutlinePhone className="w-5 h-5" />
          <span className="font-medium">Phone:</span>
          <span>
            {patient.phone || <em className="text-gray-400">Not provided</em>}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <HiOutlineUser className="w-5 h-5" />
          <span className="font-medium">Gender:</span>
          <span>
            {patient.gender || <em className="text-gray-400">Not specified</em>}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <MdCalendarToday className="w-5 h-5" />
          <span className="font-medium">Birthdate:</span>
          <span>
            {patient.birthDate || <em className="text-gray-400">Unknown</em>}
          </span>
        </div>
      </div>
    </div>
  );
}
