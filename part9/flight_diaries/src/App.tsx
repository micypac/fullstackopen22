import React, { useState, useEffect } from "react";
import axios from "axios";
import Notification from "./components/Notification";
import { DiaryEntry, NewDiaryEntry } from "./types";
import diaryService from "./services/diaryService";
import "./App.css";

function App() {
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);
  const [newDate, setNewDate] = useState("");
  const [newWeather, setNewWeather] = useState("");
  const [newVisibility, setNewVisibility] = useState("");
  const [newComment, setNewComment] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [messageClass, setMessageClass] = useState("added");

  useEffect(() => {
    const getDiaryEntries = async () => {
      const data = await diaryService.getDiaryEntries();
      setDiaryEntries(data);
    };

    getDiaryEntries();
  }, []);

  const handleNewDiary = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    const newEntry: NewDiaryEntry = {
      date: newDate,
      weather: newWeather,
      visibility: newVisibility,
      comment: newComment,
    };

    try {
      const data = await diaryService.createDiaryEntry(newEntry);
      setDiaryEntries(diaryEntries.concat(data));
      setMessageClass("added");
      setMessage("New diary entry added!");
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setMessageClass("error");
        setMessage(error.response?.data);
        setTimeout(() => {
          setMessage(null);
        }, 5000);
      } else {
        console.error(error);
      }
    }

    setNewDate("");
    setNewWeather("");
    setNewVisibility("");
    setNewComment("");
  };

  return (
    <div className="App">
      <div className="App-header">
        <h2>Add New Entry</h2>
      </div>
      <Notification message={message} messageClass={messageClass} />
      <form onSubmit={handleNewDiary}>
        <div>
          <label htmlFor="date">Date: </label>
          <input
            type="text"
            id="date"
            value={newDate}
            onChange={(e) => setNewDate(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="weather">Weather: </label>
          <input
            type="text"
            id="weather"
            value={newWeather}
            onChange={(e) => setNewWeather(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="visibility">Visibility: </label>
          <input
            type="text"
            id="visibility"
            value={newVisibility}
            onChange={(e) => setNewVisibility(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="comment">Comment: </label>
          <textarea
            id="comment"
            rows={3}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
        </div>
        <div>
          <button>Submit</button>
        </div>
      </form>
      <div className="App-header">
        <h2>Daily Entries</h2>
      </div>
      {diaryEntries.map((item: DiaryEntry) => (
        <div key={item.id}>
          <h2>{item.date}</h2>
          <p>Weather: {item.weather}</p>
          <p>Visibility: {item.visibility}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
