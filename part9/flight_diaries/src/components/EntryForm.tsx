import { EntryFormProps } from "../types";

const EntryForm = ({
  newDate,
  newWeather,
  newVisibility,
  newComment,
  setNewDate,
  setNewWeather,
  setNewVisibility,
  setNewComment,
  handleNewDiary,
}: EntryFormProps) => {
  return (
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
  );
};

export default EntryForm;
