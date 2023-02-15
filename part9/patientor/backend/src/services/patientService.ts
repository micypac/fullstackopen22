import patients from "../data/patients";
import { PublicPatientInfo } from "../types";

const getPatientsPublicInfo = (): PublicPatientInfo[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

export default {
  getPatientsPublicInfo,
};
