import { SyntheticEvent, useState } from "react";
import axios from "axios";
import {
  HealthCheckRating,
  EntryWithoutId,
  Patient,
  EntryType,
} from "../../types";
import {
  TextField,
  InputLabel,
  MenuItem,
  Button,
  Select,
  SelectChangeEvent,
} from "@mui/material";

import patientsService from "../../services/patients";
import Notification from "../Notification";

interface Props {
  patientId: string;
  setPatient: React.Dispatch<React.SetStateAction<Patient | null>>;
}

const AddEntryForm = ({ patientId, setPatient }: Props) => {
  const [entryType, setEntryType] = useState<EntryType>("HealthCheck");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState("");

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
      const codesArr = diagnosisCodes.split(" ");
      newEntry.diagnosisCodes = codesArr;
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
    setDiagnosisCodes("");
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

        <TextField
          id="date"
          label="Date"
          variant="filled"
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

        <TextField
          id="hcr"
          label="HealthCheck Rating"
          variant="filled"
          size="small"
          margin="dense"
          value={HCRating}
          onChange={(e) => setHCRating(Number(e.target.value))}
          fullWidth
          disabled={entryType !== "HealthCheck"}
        />

        <TextField
          id="dischargeDate"
          label="Discharge Date"
          variant="filled"
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

        <TextField
          id="sickStartDate"
          label="Sick Start Date"
          variant="filled"
          size="small"
          margin="dense"
          value={sickStartDate}
          onChange={(e) => setSickStartDate(e.target.value)}
          fullWidth
          disabled={entryType !== "OccupationalHealthcare"}
        />

        <TextField
          id="sickEndDate"
          label="Sick End Date"
          variant="filled"
          size="small"
          margin="dense"
          value={sickEndDate}
          onChange={(e) => setSickEndDate(e.target.value)}
          fullWidth
          disabled={entryType !== "OccupationalHealthcare"}
        />

        <TextField
          id="diagnosisCodes"
          label="Diagnosis Codes"
          variant="filled"
          size="small"
          margin="dense"
          value={diagnosisCodes}
          onChange={(e) => setDiagnosisCodes(e.target.value)}
          fullWidth
        />

        <div>
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </div>
  );
};

export default AddEntryForm;
