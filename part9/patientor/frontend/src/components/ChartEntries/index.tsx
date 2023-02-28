import { Entry as EntryType } from "../../types";
import Entry from "./Entry";

const ChartEntries = ({ entries }: { entries: EntryType[] }) => {
  return (
    <>
      <h3>Entries: </h3>
      {entries.map((entry: EntryType) => (
        <Entry key={entry.id} entry={entry} />
      ))}
    </>
  );
};

export default ChartEntries;
