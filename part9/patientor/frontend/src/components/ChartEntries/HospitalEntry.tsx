import { HospitalEntry as EntryType } from "../../types";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";

const HospitalEntry = ({ entry }: { entry: EntryType }) => {
  return (
    <div className="entry-container">
      <p className="entry-date">{entry.date}</p>
      <LocalHospitalIcon />
      <p className="entry-description">{entry.description}</p>
      <h4>Hospital Discharge Information:</h4>
      <p>{entry.discharge.date}</p>
      <p>{entry.discharge.criteria}</p>
      <p>diagnose by {entry.specialist}</p>
    </div>
  );
};

export default HospitalEntry;
