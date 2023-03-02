import { OccupationalHealthcareEntry as EntryType } from "../../types";
import WorkIcon from "@mui/icons-material/Work";
import Diagnoses from "../Diagnoses";

const OccupationalHealthcareEntry = ({ entry }: { entry: EntryType }) => {
  return (
    <div className="entry-container">
      <p className="entry-date">{entry.date}</p>
      <WorkIcon />
      <p className="entry-occupation">{entry.employerName}</p>
      <p className="entry-description">{entry.description}</p>
      <h4>Sick Leave:</h4>
      <p>{entry.sickLeave?.startDate}</p>
      <p>{entry.sickLeave?.endDate}</p>
      <p>diagnose by {entry.specialist}</p>
      <Diagnoses patientDiagnosesCodes={entry.diagnosisCodes} />
    </div>
  );
};

export default OccupationalHealthcareEntry;
