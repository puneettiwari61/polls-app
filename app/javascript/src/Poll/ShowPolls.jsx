import React, { useEffect, useState } from "react";
import poll from "../apis/poll";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    margin: "80px auto",
  },
}));

export default function ShowPolls() {
  const [polls, setPolls] = useState([]);

  useEffect(() => {
    poll
      .fetchPolls()
      .then((res) => {
        console.log(res, "fetch polls");
        setPolls(res.data.polls);
      })
      .catch((err) => console.log(err, "error from fetchpolls"));
  }, []);

  const classes = useStyles();

  return (
    <List component="nav" className={classes.root} aria-label="mailbox folders">
      {polls.map((poll) => {
        return (
          <Link to={`polls/${poll.id}`}>
            <ListItem key={poll.id} button divider>
              <ListItemText primary={poll.title} />
            </ListItem>
          </Link>
        );
      })}
    </List>
  );
}
