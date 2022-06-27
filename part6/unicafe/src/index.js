import React from 'react';
import ReactDOM from 'react-dom/client';
import { createStore } from 'redux';
import counterReducer from './reducer';

// import App from './App';

const store = createStore(counterReducer)

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}

const StatisticLine = (prop) => {
  return (
    <tr>
      <td>{prop.text}</td>
      <td>{prop.value}</td>
    </tr>
  )
}

const Statistics = ({good, neutral, bad}) => {
  const all = good + neutral + bad;
  const average = (good - bad) / all;
  const positive = (good / all) * 100;

  // If no feedbacks were clicked, display the below information.
  if (all === 0) {
    return (
      <div>
        <h1>statistics</h1>
        <p>No feedbacks given</p>
      </div>
    )
  }

  // Display statistics information only if any of the feedbacks were clicked.
  return (
    <div>
      <h1>statistics</h1>
      <table>
        <tbody>
          <StatisticLine text="good" value={good}/>
          <StatisticLine text="neutral" value={neutral}/>
          <StatisticLine text="bad" value={bad}/>
          <StatisticLine text="all" value={all}/>
          <StatisticLine text="average" value={average}/>
          <StatisticLine text="positive" value={positive + "%"}/>
        </tbody>
      </table>
    </div>
  )
}

const App = () => {

  const good = store.getState().good
  const neutral = store.getState().ok
  const bad = store.getState().bad

  const handleGoodClick = () => {
    store.dispatch({ type: 'GOOD' })
  }

  const handleNeutralClick = () => {
    store.dispatch({ type: 'NEUTRAL' })
  }

  const handleBadClick = () => {
    store.dispatch({ type: 'BAD' })
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGoodClick} text="good" />
      <Button handleClick={handleNeutralClick} text="neutral" />
      <Button handleClick={handleBadClick} text="bad" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

const renderApp = () => {
  ReactDOM.createRoot(document.getElementById('root')).render(<App />);
}

renderApp()
store.subscribe(renderApp)

