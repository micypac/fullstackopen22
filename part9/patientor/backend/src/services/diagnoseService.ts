import { Diagnose } from "../types";
import diagnoses from "../data/diagnoses";

const getAllDiagnoses = (): Diagnose[] => {
  return diagnoses;
};

export default {
  getAllDiagnoses,
};
