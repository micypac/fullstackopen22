import {
  HealthCheckEntry as HealthCheckEntryType,
  Diagnosis,
} from "../../types";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import { green, yellow, orange, red } from "@mui/material/colors";
import Diagnoses from "../Diagnoses";

const HealthCheckEntry = ({
  entry,
  diagnosesMaster,
}: {
  entry: HealthCheckEntryType;
  diagnosesMaster: Diagnosis[];
}) => {
  return (
    <div className="entry-container">
      <p className="entry-date">{entry.date}</p>
      <MedicalServicesIcon />
      <p className="entry-description">{entry.description}</p>
      <FavoriteIcon
        sx={
          entry.healthCheckRating === 0
            ? { color: green[700] }
            : entry.healthCheckRating === 1
            ? { color: yellow[500] }
            : entry.healthCheckRating === 2
            ? { color: orange[400] }
            : { color: red[500] }
        }
      />
      <p>diagnose by {entry.specialist}</p>

      <Diagnoses
        patientDiagnosesCodes={entry.diagnosisCodes}
        diagnosesMaster={diagnosesMaster}
      />
    </div>
  );
};

export default HealthCheckEntry;
