export interface Patient {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  birthDate: string;
  gender: string;
}

export type UpsertPatientInput = Omit<
  Patient,
  'id' | 'createdAt' | 'updatedAt'
>;
