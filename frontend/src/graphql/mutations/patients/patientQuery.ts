import { gql } from "@apollo/client";

export const GET_PATIENTS = gql`
  query GetPatients(
    $page: Int!
    $limit: Int!
    $search: String
    $gender: String
  ) {
    getPatients(page: $page, limit: $limit, search: $search, gender: $gender) {
      items {
        id
        firstName
        lastName
        email
        phone
        birthDate
        gender
        createdAt
        updatedAt
      }
      total
      page
      limit
    }
  }
`;

export const GET_PATIENT = gql`
  query GetPatient($id: Int!) {
    findOnePatient(id: $id) {
      id
      firstName
      lastName
      email
      phone
      birthDate
      gender
    }
  }
`;
