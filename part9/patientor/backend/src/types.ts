// export type Gender = "male" | "female" | "other";
export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

export interface Diagnose {
  code: string;
  name: string;
  latin?: string;
}

export interface Entry {}

export interface PatientInfo {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
  entries: Entry[];
}

export type PublicPatientInfo = Omit<PatientInfo, "ssn" | "entries">;

export type PatientEntry = Omit<PatientInfo, "id">;
