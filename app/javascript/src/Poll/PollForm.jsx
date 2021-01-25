import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import PollTitleForm from "./Form/PollTitleForm";
import OptionsForm from "./Form/OptionsForm";
import poll from "../apis/poll";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return ["Enter Your Poll Topic", "Enter The Options", "Create Poll"];
}

function getStepContent(
  stepIndex,
  setTopic,
  setOption1,
  setOption2,
  setOption3,
  setOption4
) {
  switch (stepIndex) {
    case 0:
      return <PollTitleForm setTopic={setTopic} />;
    case 1:
      return (
        <OptionsForm
          setOption1={setOption1}
          setOption2={setOption2}
          setOption3={setOption3}
          setOption4={setOption4}
        />
      );
    case 2:
      return (
        <h2 style={{ textAlign: "center" }}>Your poll is ready to publish</h2>
      );
    default:
      return "Unknown stepIndex";
  }
}

export default function PollForm(props) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const [topic, setTopic] = React.useState("");
  const [option1, setOption1] = React.useState("");
  const [option2, setOption2] = React.useState("");
  const [option3, setOption3] = React.useState("");
  const [option4, setOption4] = React.useState("");
  const [error, setError] = React.useState(false);

  const handleNext = () => {
    console.log(topic, "topic", option1, option2, option3, option4);
    if (!topic) {
      return setError(true);
    }
    if (activeStep === 1 && (!option1 || !option2 || !option3 || !option4)) {
      return setError(true);
    }
    if (activeStep === steps.length - 1) {
      return postDataToServer();
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const postDataToServer = () => {
    poll
      .createPoll({
        title: topic,
        options_attributes: [
          { name: option1 },
          { name: option2 },
          { name: option3 },
          { name: option4 },
        ],
      })
      .then((res) => {
        console.log(res, "res from createpoll");
        // return (window.location.href = "/");
        props.history.push("/");
      })
      .catch((err) => console.log(err, "error from createpoll"));
  };

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>
              All steps completed
            </Typography>
            <Button onClick={handleReset}>Reset</Button>
          </div>
        ) : (
          <div>
            {getStepContent(
              activeStep,
              setTopic,
              setOption1,
              setOption2,
              setOption3,
              setOption4
            )}
            <div style={{ textAlign: "center" }}>
              {error && activeStep !== 2 ? (
                <p style={{ color: "red" }}>
                  Please fill all the required fields
                </p>
              ) : (
                ""
              )}
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.backButton}
              >
                Back
              </Button>
              <Button variant="contained" color="primary" onClick={handleNext}>
                {activeStep === steps.length - 1 ? "Publish" : "Next"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
