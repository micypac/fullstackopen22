import { Gender, PatientEntry } from "./types";

const isString = (val: unknown): val is string => {
  return typeof val === "string" || val instanceof String;
};

// check name field
const parseName = (name: unknown): string => {
  if (!isString(name)) {
    throw new Error("Incorrect or missing name: " + name);
  }

  return name;
};

// check dateOfBirth field
const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing date of birth: " + date);
  }

  return date;
};

// check ssn field
const isSSN = (ssn: string): boolean => {
  const regex = new RegExp("^\\d{6}-\\d{3}[A-Z]");
  return regex.test(ssn);
};

const parseSSN = (ssn: unknown): string => {
  if (!isString(ssn) || !isSSN(ssn)) {
    throw new Error("Incorrect or missing SSN: " + ssn);
  }

  return ssn;
};

// check occupation
const parseOccupation = (occupation: unknown): string => {
  if (!isString(occupation)) {
    throw new Error("Incorrect or missing occupation: " + occupation);
  }

  return occupation;
};

// check gender
const isGender = (gender: string): gender is Gender => {
  return Object.values(Gender)
    .map((v) => v.toString())
    .includes(gender);
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error("Incorrect or missing gender: " + gender);
  }

  return gender;
};

const toNewPatientEntry = (object: unknown): PatientEntry => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (
    "name" in object &&
    "dateOfBirth" in object &&
    "ssn" in object &&
    "gender" in object &&
    "occupation" in object
  ) {
    const newPatient: PatientEntry = {
      name: parseName(object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseSSN(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
      entries: [],
    };

    return newPatient;
  } else {
    throw new Error("Incorrect data: Some required fields are missing");
  }
};

export default toNewPatientEntry;
