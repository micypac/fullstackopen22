import { SyntheticEvent, useState } from "react";
import axios from "axios";
import {
  HealthCheckRating,
  EntryWithoutId,
  Patient,
  EntryType,
  Diagnosis,
} from "../../types";
import {
  TextField,
  InputLabel,
  Input,
  MenuItem,
  Button,
  Select,
  SelectChangeEvent,
} from "@mui/material";

import patientsService from "../../services/patients";
import Notification from "../Notification";
import { useDiagnoses } from "../../context/DiagnosesContext";

interface Props {
  patientId: string;
  setPatient: React.Dispatch<React.SetStateAction<Patient | null>>;
}

const AddEntryForm = ({ patientId, setPatient }: Props) => {
  const [entryType, setEntryType] = useState<EntryType>("HealthCheck");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<
    Array<Diagnosis["code"]>
  >([]);

  // state for HealthCheck
  const [HCRating, setHCRating] = useState(HealthCheckRating.Healthy);

  // state for Hospital
  const [dischargeDate, setDischargeDate] = useState("");
  const [criteria, setCriteria] = useState("");

  // state for OccupationalHealthcare
  const [employer, setEmployer] = useState("");
  const [sickStartDate, setSickStartDate] = useState("");
  const [sickEndDate, setSickEndDate] = useState("");

  // states for Notification component
  const [message, setMessage] = useState<string | null>(null);
  const [messageClass, setMessageClass] = useState("added");

  // context for diagnoses master data
  const diagnoses = useDiagnoses();

  const onEntryTypeChange = (event: SelectChangeEvent<EntryType>) => {
    event.preventDefault();

    setEntryType(event.target.value as EntryType);
  };

  const addEntry = async (event: SyntheticEvent) => {
    event.preventDefault();

    let newEntry: EntryWithoutId;

    switch (entryType) {
      case "HealthCheck":
        newEntry = {
          date: date,
          description: description,
          specialist: specialist,
          type: entryType,
          healthCheckRating: HCRating,
        };

        break;
      case "Hospital":
        newEntry = {
          date: date,
          description: description,
          specialist: specialist,
          type: entryType,
          discharge: {
            date: dischargeDate,
            criteria: criteria,
          },
        };
        break;
      case "OccupationalHealthcare":
        newEntry = {
          date: date,
          description: description,
          specialist: specialist,
          type: entryType,
          employerName: employer,
        };

        if (sickStartDate.length && sickEndDate.length) {
          newEntry.sickLeave = {
            startDate: sickStartDate,
            endDate: sickEndDate,
          };
        }
        break;
      default:
        throw new Error("Unhandled discriminated union member for entry type");
    }

    if (diagnosisCodes.length) {
      newEntry.diagnosisCodes = diagnosisCodes;
    }

    try {
      const data = await patientsService.createEntry(patientId, newEntry);
      setPatient(data);

      setMessageClass("added");
      setMessage("New entry added!");
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setMessageClass("error");
        setMessage(error.response?.data);
        setTimeout(() => {
          setMessage(null);
        }, 5000);
      } else {
        console.error(error);
      }
    }

    setEntryType("HealthCheck");
    setDescription("");
    setDate("");
    setSpecialist("");
    setHCRating(HealthCheckRating.Healthy);
    setDischargeDate("");
    setCriteria("");
    setEmployer("");
    setSickStartDate("");
    setSickEndDate("");
    setDiagnosisCodes([]);
  };

  return (
    <div className="entry-form">
      <h3>New Health Chart Entry</h3>

      <Notification message={message} messageClass={messageClass} />

      <form onSubmit={addEntry}>
        <InputLabel htmlFor="entryType">Entry Type: </InputLabel>
        <Select
          id="entryType"
          variant="filled"
          size="small"
          margin="dense"
          value={entryType}
          onChange={onEntryTypeChange}
          fullWidth
        >
          <MenuItem value="HealthCheck">HealthCheck</MenuItem>
          <MenuItem value="Hospital">Hospital</MenuItem>
          <MenuItem value="OccupationalHealthcare">
            OccupationalHealthcare
          </MenuItem>
        </Select>

        <TextField
          id="description"
          label="Description"
          variant="filled"
          size="small"
          margin="dense"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
        />

        <InputLabel htmlFor="date">Date</InputLabel>
        <Input
          id="date"
          type="date"
          size="small"
          margin="dense"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          fullWidth
        />

        <TextField
          id="specialist"
          label="Specialist"
          variant="filled"
          size="small"
          margin="dense"
          value={specialist}
          onChange={(e) => setSpecialist(e.target.value)}
          fullWidth
        />

        <InputLabel>HealthCheck Rating</InputLabel>
        <Select
          id="hcr"
          label="HealthCheck Rating"
          variant="filled"
          size="small"
          margin="dense"
          value={HCRating}
          onChange={(e) => setHCRating(Number(e.target.value))}
          fullWidth
          disabled={entryType !== "HealthCheck"}
        >
          {Object.values(HealthCheckRating)
            .filter((v) => !isNaN(Number(v)))
            .map((item) => (
              <MenuItem key={item} value={item}>
                {item.toString()}
              </MenuItem>
            ))}
        </Select>

        <InputLabel htmlFor="dischargeDate">Discharge Date</InputLabel>
        <Input
          id="dischargeDate"
          type="date"
          size="small"
          margin="dense"
          value={dischargeDate}
          onChange={(e) => setDischargeDate(e.target.value)}
          fullWidth
          disabled={entryType !== "Hospital"}
        />

        <TextField
          id="criteria"
          label="Criteria"
          variant="filled"
          size="small"
          margin="dense"
          value={criteria}
          onChange={(e) => setCriteria(e.target.value)}
          fullWidth
          disabled={entryType !== "Hospital"}
        />

        <TextField
          id="employer"
          label="Employer"
          variant="filled"
          size="small"
          margin="dense"
          value={employer}
          onChange={(e) => setEmployer(e.target.value)}
          fullWidth
          disabled={entryType !== "OccupationalHealthcare"}
        />

        <InputLabel>Sick Leave (Start & End Date)</InputLabel>
        <Input
          id="sickStartDate"
          type="date"
          size="small"
          margin="dense"
          value={sickStartDate}
          onChange={(e) => setSickStartDate(e.target.value)}
          fullWidth
          disabled={entryType !== "OccupationalHealthcare"}
        />

        <Input
          id="sickEndDate"
          type="date"
          size="small"
          margin="dense"
          value={sickEndDate}
          onChange={(e) => setSickEndDate(e.target.value)}
          fullWidth
          disabled={entryType !== "OccupationalHealthcare"}
        />

        <InputLabel>Diagnosis Codes</InputLabel>
        <Select
          id="diagnosisCodes"
          label="Diagnosis Codes"
          variant="filled"
          size="small"
          margin="dense"
          value={diagnosisCodes}
          onChange={(e) => setDiagnosisCodes(e.target.value as string[])}
          fullWidth
          multiple
        >
          {diagnoses.map((item) => (
            <MenuItem key={item.code} value={item.code}>
              {item.code}
            </MenuItem>
          ))}
        </Select>

        <div>
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </div>
  );
};

export default AddEntryForm;
