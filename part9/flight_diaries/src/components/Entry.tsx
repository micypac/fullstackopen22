import { DiaryEntry } from "../types";

const Entry = ({ entry }: { entry: DiaryEntry }) => {
  return (
    <div>
      <h2>{entry.date}</h2>
      <p>Weather: {entry.weather}</p>
      <p>Visibility: {entry.visibility}</p>
    </div>
  );
};

export default Entry;
