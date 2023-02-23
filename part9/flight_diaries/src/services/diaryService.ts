import axios from "axios";
import { DiaryEntry, NewDiaryEntry } from "../types";

const baseUrl = "http://localhost:3001/api/diaries";

const getDiaryEntries = async () => {
  const response = await axios.get<DiaryEntry[]>(baseUrl);
  return response.data;
};

const createDiaryEntry = async (newObj: NewDiaryEntry) => {
  const response = await axios.post<DiaryEntry>(baseUrl, newObj);
  return response.data;
};

export default {
  getDiaryEntries,
  createDiaryEntry,
};
