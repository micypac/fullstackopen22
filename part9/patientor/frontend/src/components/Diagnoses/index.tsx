import { Diagnosis } from "../../types";
import { useDiagnoses } from "../../context/DiagnosesContext";

interface DiagnosesPropTypes {
  patientDiagnosesCodes: Diagnosis["code"][] | undefined;
}

const Diagnoses = ({ patientDiagnosesCodes }: DiagnosesPropTypes) => {
  const diagnoses = useDiagnoses();

  if (patientDiagnosesCodes?.length) {
    return (
      <ul>
        {patientDiagnosesCodes.map((code) => (
          <li key={code}>
            {code} {diagnoses.find((item) => item.code === code)?.name}
          </li>
        ))}
      </ul>
    );
  } else {
    return null;
  }
};

export default Diagnoses;
