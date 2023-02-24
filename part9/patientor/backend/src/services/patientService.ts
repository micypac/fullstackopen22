import { v1 as uuid } from "uuid";
import patients from "../data/patients";
import { PatientInfo, PublicPatientInfo, PatientEntry } from "../types";

const getPatientsPublicInfo = (): PublicPatientInfo[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const getPatientById = (id: string): PatientInfo | undefined => {
  const currentPatient = patients.find((patient) => patient.id === id);
  console.log(currentPatient);
  return currentPatient;
};

const addPatient = (entry: PatientEntry): PatientInfo => {
  const newPatientEntry = {
    id: uuid(),
    ...entry,
  };

  patients.push(newPatientEntry);

  return newPatientEntry;
};

export default {
  getPatientsPublicInfo,
  getPatientById,
  addPatient,
};
