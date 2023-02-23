import { DiaryEntry } from "../types";
import Entry from "./Entry";

const Entries = ({ entries }: { entries: DiaryEntry[] }) => {
  return (
    <>
      {entries.map((item) => (
        <Entry key={item.id} entry={item} />
      ))}
    </>
  );
};

export default Entries;
