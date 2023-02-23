export interface DiaryEntry {
  id: number;
  date: string;
  weather: string;
  visibility: string;
}

export type NewDiaryEntry = Omit<DiaryEntry, "id"> & { comment: string };

export interface EntryFormProps {
  newDate: string;
  newWeather: string;
  newVisibility: string;
  newComment: string;
  setNewDate: React.Dispatch<React.SetStateAction<string>>;
  setNewWeather: React.Dispatch<React.SetStateAction<string>>;
  setNewVisibility: React.Dispatch<React.SetStateAction<string>>;
  setNewComment: React.Dispatch<React.SetStateAction<string>>;
  handleNewDiary: (event: React.SyntheticEvent) => Promise<void>;
}
