import {
  Gender,
  PatientEntry,
  EntryWithoutId,
  Diagnosis,
  HealthCheckRating,
} from "./types";

const isString = (val: unknown): val is string => {
  return typeof val === "string" || val instanceof String;
};

const isNumber = (val: unknown): val is number => {
  return typeof val === "number";
};

// check name field
const parseName = (
  name: unknown,
  type: "patient" | "specialist" | "employer"
): string => {
  if (!isString(name)) {
    throw new Error(`Incorrect or missing ${type}: ${name}`);
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

// check description or criteria
const parseDescOrCriteria = (
  value: unknown,
  type: "description" | "criteria"
): string => {
  if (!isString(value)) {
    throw new Error(`Incorrect or missing ${type}: ${value}`);
  }

  return value;
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

//check healthCheckRating
const isHealthCheckRating = (hcr: number): hcr is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(hcr);
};

const parseHealthCheckRating = (hcr: unknown): HealthCheckRating => {
  if (!isNumber(hcr) || !isHealthCheckRating(hcr)) {
    throw new Error("Incorrect or missing healthCheckRating: " + hcr);
  }

  return hcr;
};

// check diagnosis
const parseDiagnosisCodes = (object: unknown): Array<Diagnosis["code"]> => {
  if (!object || typeof object !== "object" || !("diagnosisCodes" in object)) {
    // we will just trust the data to be in correct form
    return [] as Array<Diagnosis["code"]>;
  }

  return object.diagnosisCodes as Array<Diagnosis["code"]>;
};

export const toNewPatientEntry = (object: unknown): PatientEntry => {
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
      name: parseName(object.name, "patient"),
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

export const toNewChartEntry = (object: unknown): EntryWithoutId => {
  if (!object || typeof object !== "object") {
    throw new Error("Incorrect or missing data");
  }

  if (
    "date" in object &&
    "specialist" in object &&
    "description" in object &&
    "type" in object
  ) {
    let newEntry: EntryWithoutId;

    switch (object.type) {
      case "HealthCheck":
        if (!("healthCheckRating" in object))
          throw new Error("Incorrect data: Some required fields are missing");

        newEntry = {
          date: parseDate(object.date),
          specialist: parseName(object.specialist, "specialist"),
          description: parseDescOrCriteria(object.description, "description"),
          type: "HealthCheck",
          healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
        };

        if ("diagnosisCodes" in object) {
          newEntry["diagnosisCodes"] = parseDiagnosisCodes(
            object.diagnosisCodes
          );
        }

        return newEntry;

      case "Hospital":
        if ("discharge" in object) {
          if (!object.discharge || typeof object.discharge !== "object")
            throw new Error("Incorrect or missing data");

          if ("date" in object.discharge && "criteria" in object.discharge) {
            newEntry = {
              date: parseDate(object.date),
              specialist: parseName(object.specialist, "specialist"),
              description: parseDescOrCriteria(
                object.description,
                "description"
              ),
              type: "Hospital",
              discharge: {
                date: parseDate(object.discharge.date),
                criteria: parseDescOrCriteria(
                  object.discharge.criteria,
                  "criteria"
                ),
              },
            };

            if ("diagnosisCodes" in object) {
              newEntry["diagnosisCodes"] = parseDiagnosisCodes(
                object.diagnosisCodes
              );
            }

            return newEntry;
          } else {
            throw new Error("Incorrect data: Some required fields are missing");
          }
        } else {
          throw new Error("Incorrect data: Some required fields are missing");
        }

      case "OccupationalHealthcare":
        if (!("employerName" in object))
          throw new Error("Incorrect data: Some required fields are missing");

        newEntry = {
          date: parseDate(object.date),
          specialist: parseName(object.specialist, "specialist"),
          description: parseDescOrCriteria(object.description, "description"),
          type: "OccupationalHealthcare",
          employerName: parseName(object.employerName, "employer"),
        };

        if ("diagnosisCodes" in object) {
          newEntry["diagnosisCodes"] = parseDiagnosisCodes(
            object.diagnosisCodes
          );
        }

        if ("sickLeave" in object) {
          if (!object.sickLeave || typeof object.sickLeave !== "object")
            throw new Error("Incorrect or missing data");

          if (
            "startDate" in object.sickLeave &&
            "endDate" in object.sickLeave
          ) {
            newEntry.sickLeave = {
              startDate: parseDate(object.sickLeave.startDate),
              endDate: parseDate(object.sickLeave.endDate),
            };
          } else {
            throw new Error("Incorrect data: Some required fields are missing");
          }
        }

        return newEntry;

      default:
        throw new Error("Unhandled discriminated union member for entary type");
    }
  } else {
    throw new Error("Incorrect data: Some required fields are missing");
  }
};
