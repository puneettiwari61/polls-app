import { Grid, Paper, TextField } from "@material-ui/core";
import React from "react";

export default function OptionsForm({
  setOption1,
  setOption2,
  setOption3,
}) {
  return (
    <Grid
      align="center"
      style={{ display: "flex", alignItems: "center", flexDirection: "column" }}
    >
      <TextField
        size="medium"
        id="outlined-basic"
        label="option 1"
        variant="outlined"
        autoFocus
        placeholder="Enter Option 1.."
        style={{ width: "40%", margin: "20px" }}
        required
        onChange={(e) => setOption1(e.target.value)}
      />
      <TextField
        size="medium"
        id="outlined-basic"
        label="option 2"
        variant="outlined"
        placeholder="Enter Option 2.."
        style={{ width: "40%", margin: "20px" }}
        required
        onChange={(e) => setOption2(e.target.value)}
      />
      <TextField
        size="medium"
        id="outlined-basic"
        label="option 3"
        variant="outlined"
        placeholder="Enter Option 3.."
        style={{ width: "40%", margin: "20px" }}
        onChange={(e) => setOption3(e.target.value)}
      />
    </Grid>
  );
}
