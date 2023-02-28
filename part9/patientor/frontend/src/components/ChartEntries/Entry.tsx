import { Entry as EntryType, Diagnosis } from "../../types";
import HealthCheckEntry from "./HealthCheckEntry";
import HospitalEntry from "./HospitalEntry";
import OccupationalHealthcareEntry from "./OccupationalHealthcareEntry";

const assertNever = (val: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(val)} `
  );
};

const Entry: React.FC<{ entry: EntryType; diagnosesMaster: Diagnosis[] }> = ({
  entry,
  diagnosesMaster,
}) => {
  switch (entry.type) {
    case "HealthCheck":
      return (
        <HealthCheckEntry entry={entry} diagnosesMaster={diagnosesMaster} />
      );

    case "Hospital":
      return <HospitalEntry entry={entry} diagnosesMaster={diagnosesMaster} />;

    case "OccupationalHealthcare":
      return (
        <OccupationalHealthcareEntry
          entry={entry}
          diagnosesMaster={diagnosesMaster}
        />
      );

    default:
      return assertNever(entry);
  }
};

export default Entry;
