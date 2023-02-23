import { EntryFormProps, Weather, Visibility } from "../types";

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
          type="date"
          id="date"
          value={newDate}
          onChange={(e) => setNewDate(e.target.value)}
        />
      </div>
      <div>
        <fieldset>
          <legend>Weather: </legend>
          {Object.values(Weather).map((item) => (
            <div key={item.toString()}>
              <input
                type="radio"
                name="weather"
                id={item.toString()}
                value={item.toString()}
                checked={newWeather === item.toString()}
                onChange={(e) => setNewWeather(e.target.value)}
              />
              <label htmlFor={item.toString()}>{item.toString()}</label>
            </div>
          ))}
        </fieldset>
      </div>
      <div>
        <fieldset>
          <legend>Visibility: </legend>
          {Object.values(Visibility).map((item) => (
            <div key={item.toString()}>
              <input
                type="radio"
                name="visibility"
                id={item.toString()}
                value={item.toString()}
                checked={newVisibility === item.toString()}
                onChange={(e) => setNewVisibility(e.target.value)}
              />
              <label htmlFor={item.toString()}>{item.toString()}</label>
            </div>
          ))}
        </fieldset>
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
