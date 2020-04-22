import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistics = (props) => {
  if (props.sum !== 0) {  
    return(
      <table>
        <tbody>
          <Statistic text="good" value ={props.good} unit="" />
          <Statistic text="neutral" value ={props.neutral} unit="" />
          <Statistic text="bad" value ={props.bad} unit="" />
          <Statistic text="all" value ={props.sum} unit="" />
          <Statistic text="average" value ={props.avg.toFixed(1)} unit="" />
          <Statistic text="positive" value ={props.pos.toFixed(1)} unit="%" />
        </tbody>
      </table>
    )
  }
  
  return(
    <div>
      No feedback given
    </div>
  )
}

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const Statistic = (props) => {
  return(
    <tr>    
      <td>{props.text}</td>
      <td>{props.value}</td>
      <td>{props.unit}</td>
    </tr>
  )
}

const App = () => {
  
  // save clicks of each button to own state

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  const [sum, setSum] = useState(0)
  const [avg, setAvg] = useState(0)
  const [pos, setPos] = useState(0)

  const handleGoodClick = (props) => {
    setGood(good + 1)
    setSum(sum + 1)
    setAvg(((good + 1) - bad) / (sum + 1))
    setPos(((good + 1) / (sum + 1)) * 100)
  }

  const handleNeutralClick = (props) => {
    setNeutral(neutral + 1)
    setSum(sum + 1)
    setAvg((good - bad) / (sum + 1))
    setPos((good / (sum + 1)) * 100)
  }

  const handleBadClick = (props) => {
    setBad(bad + 1)
    setSum(sum + 1)
    setAvg((good - (bad + 1)) / (sum + 1))
    setPos((good / (sum + 1)) * 100)
  }

  return (
    <div>
      <h2>give feedback</h2>
      <Button onClick={handleGoodClick} text='good' />
      <Button onClick={handleNeutralClick} text='neutral' />
      <Button onClick={handleBadClick} text='bad' />
      <h2>statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad}
                  sum ={sum} avg={avg} pos={pos} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
