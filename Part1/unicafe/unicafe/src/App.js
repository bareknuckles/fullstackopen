import { useState } from 'react'

const Header = ({text}) => {
  return(
    <div>
      <h3>{text}</h3>
    </div>
  )
}

const Button = ({onClick, text}) => {
  return(
    <div>
      <button onClick={onClick}>
        {text}
      </button>
    </div>
  )
}

const StatisticLine = ({text, value}) => {
  return(
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({good, neutral, bad}) => {
  const total = good + neutral + bad
  if(total === 0){
    return(
      <div>
        <p>No feedback received!</p>
      </div>
    )
  }
  const average = () => (good - bad) / total;
  const positive = () => (good / total) * 100 + " %";
  return(
      <table>
        <tbody>
          <StatisticLine text='good' value={good}/>
          <StatisticLine text='neutral' value={neutral}/>
          <StatisticLine text='bad' value={bad}/>
          <StatisticLine text='all' value={total}/>
          <StatisticLine text='average' value={average()}/>
          <StatisticLine text='positive' value={positive()}/>
        </tbody>
      </table>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => setGood(good + 1)
  const handleNeutralClick = () => setNeutral(neutral + 1)
  const handleBadClick = () => setBad(bad + 1)
  
  return (
    <div>
      <Header text='Giving Feedback'/>
      <Button onClick={handleGoodClick} text='good'/>
      <Button onClick={handleNeutralClick} text='neutral'/>
      <Button onClick={handleBadClick} text='bad'/>
      <Header text={'Stats'}/>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App
