import React, { useEffect, useState } from "react";
import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import poll from "../apis/poll";
import vote from "../apis/vote";

const useStyles = makeStyles((theme) => ({
  pollBox: {
    border: "1px solid black",
    width: "40%",
    // padding: "0px 10px",
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
    backgroundColor: "lightblue",
    // width: "25%",
    // padding: "0px",
    // margin: "0px"
  },
}));

const SinglePoll = (props) => {
  const [pollQuestion, setPollQuestion] = useState("");
  const [pollOptions, setPollOptions] = useState([]);
  const id = props.match.params.id;
  const [totalVotes, setTotalVotes] = useState("");
  const [message, setMessage] = useState("");

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
        totalVotesCalculator(pollAnswers);
      })
      .catch((err) => console.log(err, "error from fetch poll by id"));
  }, []);

  const handleVote = (optionId) => {
    vote
      .createVote({ vote: { poll_id: id, option_id: optionId } })
      .then((res) => {
        console.log(res, "from create vote");
        if (res.data.notice == "You have already voted") {
          return setMessage(res.data.notice);
        }
        const updatePollOptions = pollOptions.map((o) => {
          o.id == optionId ? ++o.votes : "";
          return o;
        });
        setPollOptions(updatePollOptions);
        totalVotesCalculator(updatePollOptions);
      })
      .catch((err) => console.log(err, "error from create vote"));
  };

  const totalVotesCalculator = (pollAnswers) => {
    const totalVotes = pollAnswers.reduce((acc, cv) => {
      return acc + cv.votes;
    }, 0);
    // console.log(totalVotes, "totalVotes");
    setTotalVotes(totalVotes);
  };

  const widthCalculator = (votes) => {
    console.log(totalVotes);
    const width = (votes * 100) / totalVotes;
    return width ? width : 0;
    // (votes * 100) / totalVotes
    //   ? ((votes * 100) / totalVotes).toString().substr(4)
    //   : 0;
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
            <p style={{ padding: "0px", margin: "0px", textAlign: "center" }}>
              {option.option}
            </p>
            <Box
              style={{ width: `${widthCalculator(option.votes)}%` }}
              className={classes.option}
            >
              <p
                style={{ padding: "0px", margin: "0px", textAlign: "center" }}
              >{`${widthCalculator(option.votes).toString().substr(0, 5)}%`}</p>
            </Box>
          </Box>
        );
      })}
      <h3>Toatal Votes: {totalVotes}</h3>
      <p style={{ color: "red" }}>{message}</p>
      <p style={{ color: "red" }}>
        {!props.isLoggedIn && "Please log in to vote."}
      </p>
    </Box>
  );
};

export default SinglePoll;
