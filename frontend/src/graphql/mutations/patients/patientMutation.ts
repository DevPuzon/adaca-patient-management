import { gql } from "@apollo/client";

export const CREATE_PATIENT = gql`
  mutation CreatePatient($data: CreatePatientDto!) {
    createPatient(data: $data) {
      message
      patient {
        id
      }
    }
  }
`;

export const UPDATE_PATIENT = gql`
  mutation UpdatePatient($data: UpdatePatientDto!) {
    updatePatient(data: $data) {
      message
      patient {
        id
      }
    }
  }
`;

export const DELETE_PATIENT = gql`
  mutation DeletePatient($id: Int!) {
    deletePatient(id: $id) {
      message
    }
  }
`;
