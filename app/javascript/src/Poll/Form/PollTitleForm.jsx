import { Grid, Paper, TextField } from "@material-ui/core";
import React from "react";

export default function PollTitleForm({ setTopic }) {
  return (
    <Grid align="center">
      <TextField
        size="medium"
        id="outlined-basic"
        label="Topic"
        variant="outlined"
        autoFocus
        placeholder="Enter Poll topic.."
        width="100%"
        style={{ width: "60%", margin: "50px" }}
        required
        onChange={(e) => setTopic(e.target.value)}
      />
    </Grid>
  );
}
