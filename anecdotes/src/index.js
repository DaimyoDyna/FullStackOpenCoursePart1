import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState([0, 0, 0, 0, 0, 0])
  const [highest, setHighest] = useState(0)

  const handleVote = (props) => {
    // update votes array in a way that is allowed:
    const votesCopy = [...votes]
    votesCopy[selected] += 1
    setVotes(votesCopy)
    // update anecdote with most votes:
    if (votesCopy[selected] > votesCopy[highest]) {
      setHighest(selected)
    }
  }

  const handleNextAnecdote = (props) => {
    setSelected(Math.round(Math.random() * 5))
  }

  return (
    <div>
      <h2>Anecdote of the day</h2>
      <Anecdote text={anecdotes[selected]} />
      <HasVotes voteCount={votes[selected]} />
      <Button onClick={handleVote} text='vote' />
      <Button onClick={handleNextAnecdote} text='next anecdote' />
      <h2>Anecdote with most votes</h2>
      <Anecdote text={anecdotes[highest]} />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const Anecdote = (props) => (
  <p>{props.text}</p>
)

const HasVotes = (props) => (
  <p>has {props.voteCount} votes</p>
)

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
