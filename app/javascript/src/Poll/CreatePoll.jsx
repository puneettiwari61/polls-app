import React, { Component } from 'react';
import Poll from 'react-polls';
import poll from '../apis/poll'
import vote from '../apis/vote'

// Declaring poll question and answers
const pollQuestion = 'Is react-polls useful?'
const pollAnswers = [
  { option: 'Yes', votes: 0 },
  { option: 'No', votes: 1 }
]

class CreatePoll extends Component {
  // Setting answers to state to reload the component with each vote
  state = {
    pollAnswers: [...pollAnswers],
    poll: ""
  }

  

  // Handling user vote
  // Increments the votes count of answer when the user votes
  handleVote = voteAnswer => {
    const { pollAnswers } = this.state
    const newPollAnswers = pollAnswers.map(answer => {
      if (answer.option === voteAnswer) answer.votes++
      return answer
    })
    this.setState({
      pollAnswers: newPollAnswers
    })
  }

  handleClick = () => {
    // poll.createPoll({title: this.state.poll, options_attributes: [{name: "no"}, {name: "yes"}, {name:"cool"}]}).then(res => {
    //     console.log(res,"res from createpoll")
    // }).catch(err => console.log(err,"error from createpoll"))

    // poll.fetchPolls().then(res => console.log(res,"fetch polls" )).catch(err => console.log(err,"error from fetchpolls"))

    // poll.fetchPollById(2).then(res => console.log(res,"fetch poll by id" )).catch(err => console.log(err,"error from fetch poll by id"))

    vote.createVote({vote: {poll_id: 3, option_id: 8}}).then(res => console.log(res,"from create vote")).catch(err => console.log(err,"error from create vote"))
  }

  render () {
    const { pollAnswers } = this.state
    return (
      <div>
        <Poll customStyles={{theme: "cyan"}} question={pollQuestion} answers={pollAnswers} onVote={this.handleVote} noStorage={true} vote="No" />
        <input type="text" onChange={(e) => this.setState({poll: e.target.value})} name="poll" value={this.state.poll} />
        <button onClick={this.handleClick}  >Create poll</button>
      </div>
    );
  }
};

export default CreatePoll;