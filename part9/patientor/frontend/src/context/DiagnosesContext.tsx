import React from "react";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  PropsWithChildren,
} from "react";
import { Diagnosis } from "../types";
import diagnosesService from "../services/diagnoses";

const DiagnosesContext = createContext<Diagnosis[]>([]);

export const useDiagnoses = () => useContext(DiagnosesContext);

const DiagnosesProvider: React.FC<PropsWithChildren> = (props) => {
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  useEffect(() => {
    const fetchDiagnosesData = async () => {
      const diagnosesData = await diagnosesService.getAll();
      setDiagnoses(diagnosesData);
    };

    fetchDiagnosesData();
  }, []);

  return (
    <DiagnosesContext.Provider value={diagnoses}>
      {props.children}
    </DiagnosesContext.Provider>
  );
};

export default DiagnosesProvider;
