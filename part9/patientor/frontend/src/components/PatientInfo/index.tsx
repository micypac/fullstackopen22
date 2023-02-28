import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Patient, Diagnosis } from "../../types";
import patientService from "../../services/patients";
import axios from "axios";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import TransgenderIcon from "@mui/icons-material/Transgender";
import ChartEntries from "../ChartEntries";

const PatientInfo = ({ diagnoses }: { diagnoses: Diagnosis[] }) => {
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

      <ChartEntries entries={patient.entries} diagnosesMaster={diagnoses} />
      {/* <h3>Entries: </h3>
      {patient.entries.map((entry, idx) => (
        <div key={idx}>
          <p>
            {entry.date} | {entry.description}
          </p>
          <ul>
            {entry.diagnosisCodes?.map((code, codeIdx) => (
              <li key={codeIdx}>
                <>
                  {code}{" "}
                  {diagnoses.find((diagnose) => diagnose.code === code)?.name}
                </>
              </li>
            ))}
          </ul>
        </div>
      ))} */}
    </div>
  ) : (
    <div>
      <h2>{message}</h2>
    </div>
  );

  return content;
};

export default PatientInfo;
