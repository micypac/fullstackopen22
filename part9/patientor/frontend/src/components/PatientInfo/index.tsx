import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Patient } from "../../types";
import patientService from "../../services/patients";
import axios from "axios";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import TransgenderIcon from "@mui/icons-material/Transgender";
import ChartEntries from "../ChartEntries";
import AddEntryForm from "../AddEntry";

const PatientInfo = () => {
  const { patientId } = useParams();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [message, setMessage] = useState<string | null>("");

  useEffect(() => {
    const getPatientInfo = async () => {
      if (patientId) {
        try {
          const data = await patientService.findById(patientId);

          if (data) setPatient(data);
        } catch (error) {
          if (axios.isAxiosError(error)) {
            setMessage(error.response?.data);
          }
        }
      }
    };

    getPatientInfo();
  }, [patientId]);

  const content = patient ? (
    <div>
      <h2>{patient.name}</h2>
      {patient.gender === "other" ? (
        <TransgenderIcon />
      ) : patient.gender === "male" ? (
        <MaleIcon />
      ) : (
        <FemaleIcon />
      )}

      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>

      <AddEntryForm patientId={patientId as string} setPatient={setPatient} />

      <ChartEntries entries={patient.entries} />
    </div>
  ) : (
    <div>
      <h2>{message}</h2>
    </div>
  );

  return content;
};

export default PatientInfo;
