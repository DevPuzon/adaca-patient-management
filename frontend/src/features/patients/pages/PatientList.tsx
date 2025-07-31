import Spinner from "@/components/ui/Spinner";
import { DELETE_PATIENT } from "@/graphql/mutations/patients/patientMutation";
import { GET_PATIENTS } from "@/graphql/mutations/patients/patientQuery";
import { useGraphqlMutation } from "@/lib/hooks/useGraphqlMutation";
import { useGraphqlQuery } from "@/lib/hooks/useGraphqlQuery";
import type { RootState } from "@/store";
import {
  clearShouldRefetch,
  deletePatient,
} from "@/store/patient/patientSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment-timezone";

export default function PatientList() {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const shouldRefetch = useSelector(
    (state: RootState) => state.patient.shouldRefetchPatients
  );

  const limit = 10;

  const { data, loading, refetch } = useGraphqlQuery({
    query: GET_PATIENTS,
    variables: {
      page,
      limit,
      search: searchTerm || undefined,
      gender: selectedGender || undefined,
    },
    showToastOnError: true,
    skip: false,
  });

  const { execute: executeDelete } = useGraphqlMutation({
    mutation: DELETE_PATIENT,
  });

  const patients = data?.getPatients?.items || [];
  const total = data?.getPatients?.total || 0;
  const totalPages = Math.ceil(total / limit);

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this patient?")) {
      await executeDelete({ variables: { id } });
      dispatch(deletePatient(id));
      refetch();
    }
  };

  useEffect(() => {
    if (shouldRefetch) {
      refetch();
      dispatch(clearShouldRefetch());
    }
  }, [shouldRefetch]);

  return (
    <section className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-800">Patients</h2>
        <Link
          to="/patients/create"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-lg transition"
        >
          + Add Patient
        </Link>
      </div>
      <div className="flex flex-wrap items-center gap-4 mt-4">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setPage(1);
          }}
          className="px-3 py-2 border rounded-md text-sm w-64"
        />
        <select
          value={selectedGender}
          onChange={(e) => {
            setSelectedGender(e.target.value);
            setPage(1);
          }}
          className="px-3 py-2 border rounded-md text-sm"
        >
          <option value="">All Genders</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>

      {loading ? (
        <div className="h-40 flex justify-center items-center">
          <Spinner label="Loading patients..." />
        </div>
      ) : patients.length === 0 ? (
        <p className="text-gray-600 italic">No patients found.</p>
      ) : (
        <div className="overflow-auto rounded-lg shadow">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Phone</th>
                <th className="px-4 py-3">Gender</th>
                <th className="px-4 py-3">Birth Date</th>
                <th className="px-4 py-3">Created At</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-gray-200">
              {patients.map((patient: any) => (
                <tr key={patient.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 font-medium text-gray-900">
                    {patient.firstName} {patient.lastName}
                  </td>
                  <td className="px-4 py-2">{patient.email || "—"}</td>
                  <td className="px-4 py-2">{patient.phone || "—"}</td>
                  <td className="px-4 py-2 capitalize">
                    {patient.gender || "—"}
                  </td>
                  <td className="px-4 py-2">
                    {patient.birthDate
                      ? moment(patient.birthDate).format("MMM DD, YYYY")
                      : "—"}
                  </td>
                  <td className="px-4 py-2 text-gray-500">
                    {moment(patient.createdAt).format("MMM DD, YYYY")}
                  </td>
                  <td className="px-4 py-2">
                    <div className="flex gap-3">
                      <Link
                        to={`/patients/${patient.id}`}
                        className="text-blue-600 hover:underline text-sm"
                      >
                        View
                      </Link>
                      <Link
                        to={`/patients/${patient.id}/edit`}
                        className="text-indigo-600 hover:underline text-sm"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(patient.id)}
                        className="text-red-600 hover:underline text-sm cursor-pointer"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!loading && totalPages > 1 && (
        <div className="mt-6 flex justify-center items-center gap-4">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md text-sm disabled:opacity-50 cursor-pointer"
          >
            Previous
          </button>
          <span className="text-sm text-gray-500">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            disabled={page === totalPages}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md text-sm disabled:opacity-50 cursor-pointer"
          >
            Next
          </button>
        </div>
      )}
    </section>
  );
}
