import { Entry as EntryType, Diagnosis } from "../../types";
import Entry from "./Entry";

const ChartEntries = ({
  entries,
  diagnosesMaster,
}: {
  entries: EntryType[];
  diagnosesMaster: Diagnosis[];
}) => {
  return (
    <>
      <h3>Entries: </h3>
      {entries.map((entry: EntryType) => (
        <Entry key={entry.id} entry={entry} diagnosesMaster={diagnosesMaster} />
      ))}
    </>
  );
};

export default ChartEntries;
