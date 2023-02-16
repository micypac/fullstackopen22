import express from "express";
import patientService from "../services/patientService";
const patientsRouter = express.Router();

patientsRouter.get("/", (_req, res) => {
  res.send(patientService.getPatientsPublicInfo());
});

patientsRouter.post("/", (req, res) => {
  const { name, dateOfBirth, ssn, gender, occupation } = req.body;

  const newPatient = patientService.addPatient(
    name,
    dateOfBirth,
    ssn,
    gender,
    occupation
  );

  res.json(newPatient);
});

export default patientsRouter;
