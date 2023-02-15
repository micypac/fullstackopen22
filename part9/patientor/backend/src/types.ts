export type Gender = "male" | "female" | "other";

export interface PatientInfo {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
}

export type PublicPatientInfo = Omit<PatientInfo, "ssn">;

export interface Diagnose {
  code: string;
  name: string;
  latin?: string;
}
