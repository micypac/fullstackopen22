import { Diagnosis } from "../../types";

interface DiagnosesPropTypes {
  patientDiagnosesCodes: Diagnosis["code"][] | undefined;
  diagnosesMaster: Diagnosis[];
}

const Diagnoses = ({
  patientDiagnosesCodes,
  diagnosesMaster,
}: DiagnosesPropTypes) => {
  if (patientDiagnosesCodes?.length) {
    return (
      <ul>
        {patientDiagnosesCodes.map((code) => (
          <li key={code}>
            {code} {diagnosesMaster.find((item) => item.code === code)?.name}
          </li>
        ))}
      </ul>
    );
  } else {
    return null;
  }
};

export default Diagnoses;
