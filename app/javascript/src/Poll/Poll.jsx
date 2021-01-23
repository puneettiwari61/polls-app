import React, { useEffect, useState } from "react";
import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import poll from "../apis/poll";
import vote from "../apis/vote";

const useStyles = makeStyles((theme) => ({
  pollBox: {
    border: "1px solid black",
    width: "40%",
    padding: "0px 10px",
    borderRadius: "8px",
    margin: "5px",
    cursor: "pointer",
    textAlign: "center",
    "&:hover": {
      backgroundColor: "skyblue",
    },
  },
  box: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    border: "1px solid black",
    borderRadius: "16px",
    padding: "40px",
    margin: "100px auto",
    width: "40%",
  },
  option: {
    backgroundColor: "grey",
    // width: "25%",
  },
}));

const SinglePoll = (props) => {
  const [pollQuestion, setPollQuestion] = useState("");
  const [pollOptions, setPollOptions] = useState([]);
  const id = props.match.params.id;
  const [totalVotes, setTotalVotes] = useState("");

  const classes = useStyles();

  useEffect(() => {
    poll
      .fetchPollById(id)
      .then((res) => {
        console.log(res, "fetch poll by id");
        let pollAnswers = res.data.options.map((o) => {
          return { option: o.name, votes: o.vote_count, id: o.id };
        });
        console.log(pollAnswers);
        // this.setState({ pollQuestion: res.data.poll.title, pollAnswers });
        setPollQuestion(res.data.poll.title);
        setPollOptions(pollAnswers);
        widthCalculator(pollAnswers);
      })
      .catch((err) => console.log(err, "error from fetch poll by id"));
  }, []);

  const handleVote = (optionId) => {
    vote
      .createVote({ vote: { poll_id: id, option_id: optionId } })
      .then((res) => {
        console.log(res, "from create vote");
        const updatePollOptions = pollOptions.map((o) => {
          o.id == optionId ? ++o.votes : "";
          return o;
        });
        setPollOptions(updatePollOptions)
        widthCalculator(updatePollOptions);
      })
      .catch((err) => console.log(err, "error from create vote"));
  };

  const widthCalculator = (pollAnswers) => {
    const totalVotes = pollAnswers.reduce((acc, cv) => {
      return acc + cv.votes;
    }, 0);
    console.log(totalVotes, "totalVotes");
    setTotalVotes(totalVotes);
  };
  return (
    <Box className={classes.box}>
      <h1>{pollQuestion}</h1>
      {pollOptions.map((option) => {
        return (
          <Box
            className={classes.pollBox}
            onClick={() => handleVote(option.id)}
            key={option.id}
          >
            <Box
              style={{ width: `${(option.votes * 100) / totalVotes || 0}%` }}
              className={classes.option}
            >
              <p>{option.option}</p>
              <p>{`${(option.votes * 100) / totalVotes || 0}%`}</p>
            </Box>
          </Box>
        );
      })}
      <h3>Toatal Votes: {totalVotes}</h3>
    </Box>
  );
};

export default SinglePoll;
