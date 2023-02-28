import {
  OccupationalHealthcareEntry as EntryType,
  Diagnosis,
} from "../../types";
import WorkIcon from "@mui/icons-material/Work";
import Diagnoses from "../Diagnoses";

const OccupationalHealthcareEntry = ({
  entry,
  diagnosesMaster,
}: {
  entry: EntryType;
  diagnosesMaster: Diagnosis[];
}) => {
  return (
    <div className="entry-container">
      <p className="entry-date">{entry.date}</p>
      <WorkIcon />
      <p className="entry-occupation">{entry.employerName}</p>
      <p className="entry-description">{entry.description}</p>
      <p>diagnose by {entry.specialist}</p>
      <Diagnoses
        patientDiagnosesCodes={entry.diagnosisCodes}
        diagnosesMaster={diagnosesMaster}
      />
    </div>
  );
};

export default OccupationalHealthcareEntry;
