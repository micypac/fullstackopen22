import { v1 as uuid } from "uuid";
import patients from "../data/patients";
import { PatientInfo, PublicPatientInfo, Gender } from "../types";

const getPatientsPublicInfo = (): PublicPatientInfo[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (
  name: string,
  dateOfBirth: string,
  ssn: string,
  gender: Gender,
  occupation: string
): PatientInfo => {
  const newPatientEntry = {
    id: uuid(),
    name,
    dateOfBirth,
    ssn,
    gender,
    occupation,
  };

  patients.push(newPatientEntry);

  return newPatientEntry;
};

export default {
  getPatientsPublicInfo,
  addPatient,
};
