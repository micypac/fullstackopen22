import { Entry as EntryType } from "../../types";
import HealthCheckEntry from "./HealthCheckEntry";
import HospitalEntry from "./HospitalEntry";
import OccupationalHealthcareEntry from "./OccupationalHealthcareEntry";

const assertNever = (val: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(val)} `
  );
};

const Entry: React.FC<{ entry: EntryType }> = ({ entry }) => {
  switch (entry.type) {
    case "HealthCheck":
      return <HealthCheckEntry entry={entry} />;

    case "Hospital":
      return <HospitalEntry entry={entry} />;

    case "OccupationalHealthcare":
      return <OccupationalHealthcareEntry entry={entry} />;

    default:
      return assertNever(entry);
  }
};

export default Entry;
