import { SyntheticEvent, useState } from "react";
import axios from "axios";
import { HealthCheckRating, EntryWithoutId, Patient } from "../../types";
import {
  TextField,
  InputLabel,
  // MenuItem,
  // Select,
  // Grid,
  Button,
  // SelectChangeEvent,
} from "@mui/material";

import patientsService from "../../services/patients";
import Notification from "../Notification";

const AddEntryForm = ({
  patientId,
  setPatient,
}: {
  patientId: string;
  setPatient: React.Dispatch<React.SetStateAction<Patient | null>>;
}) => {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [HCRating, setHCRating] = useState(HealthCheckRating.Healthy);
  const [diagnosisCodes, setDiagnosisCodes] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [messageClass, setMessageClass] = useState("added");

  const addEntry = async (event: SyntheticEvent) => {
    event.preventDefault();

    const newEntry: EntryWithoutId = {
      date: date,
      description: description,
      specialist: specialist,
      type: "HealthCheck",
      healthCheckRating: HCRating,
    };

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

    setDescription("");
    setDate("");
    setSpecialist("");
    setHCRating(HealthCheckRating.Healthy);
    setDiagnosisCodes("");
  };

  return (
    <div className="entry-form">
      <h2>New HealthCheck Entry</h2>
      <Notification message={message} messageClass={messageClass} />
      <form onSubmit={addEntry}>
        <InputLabel htmlFor="description">Description</InputLabel>
        <TextField
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
        />

        <InputLabel htmlFor="date">Date</InputLabel>
        <TextField
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          fullWidth
        />

        <InputLabel htmlFor="specialist">Specialist</InputLabel>
        <TextField
          id="specialist"
          value={specialist}
          onChange={(e) => setSpecialist(e.target.value)}
          fullWidth
        />

        <InputLabel htmlFor="hcr">HealthCheck Rating</InputLabel>
        <TextField
          id="hcr"
          value={HCRating}
          onChange={(e) => setHCRating(Number(e.target.value))}
          fullWidth
        />

        <InputLabel htmlFor="diagnosisCodes">Diagnosis Codes</InputLabel>
        <TextField
          id="diagnosisCodes"
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
