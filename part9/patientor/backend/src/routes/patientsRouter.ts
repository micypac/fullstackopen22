import express from "express";
import patientService from "../services/patientService";
import toNewPatientEntry from "../utils";
const patientsRouter = express.Router();

patientsRouter.get("/", (_req, res) => {
  res.send(patientService.getPatientsPublicInfo());
});

patientsRouter.post("/", (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);
    const addedPatient = patientService.addPatient(newPatientEntry);

    res.json(addedPatient);
  } catch (err) {
    let errorMsg = "Something went wrong.";

    if (err instanceof Error) {
      errorMsg += "Error: " + err.message;
    }

    res.status(400).send(errorMsg);
  }
});

export default patientsRouter;
