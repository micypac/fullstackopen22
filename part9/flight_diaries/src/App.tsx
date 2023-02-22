import React, { useState, useEffect } from "react";
import axios from "axios";
import { DiaryEntry } from "./types";
import "./App.css";

function App() {
  const [diaryEntries, setDiaryEntries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    axios
      .get<DiaryEntry[]>("http://localhost:3001/api/diaries")
      .then((resp) => {
        // console.log(resp.data);
        setDiaryEntries(resp.data);
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <h2>Daily Entries</h2>
      </header>
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
