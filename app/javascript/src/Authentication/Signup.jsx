import React, { useState } from "react";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import FormHelperText from '@material-ui/core/FormHelperText';
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import authApi from "../apis/auth";
import { setAuthHeaders } from "../apis/axios";
import { setToLocalStorage } from "../helpers/storage";





const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Signup = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false)
  const [helperText, setHelperText] = React.useState('Choose wisely');

  const classes = useStyles();

  const handleSubmit = async event => {
    event.preventDefault();
    console.log(email, password, passwordConfirmation)
    try {
      setLoading(true);
      const response = await authApi.signup({
        user: {
          email,
          password,
          password_confirmation: passwordConfirmation,
        },
      });
      console.log(response,"successfull signup")
      setToLocalStorage({
        authToken: response.data.auth_token,
        email,
        userId: response.data.userId,
      });
        setAuthHeaders();
      setLoading(false);
      // history.push("/");
      window.location.href = "/";
    } catch (error) {
      setLoading(false);
      setError(true);
      setHelperText(error.response.data.errors)
      console.log(error.response.data.errors,"error from signup");
    }
  };
  return (
    <Container component="main" maxWidth="xs">
    <CssBaseline />
    <div className={classes.paper}>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign up
      </Typography>
      <form className={classes.form} onSubmit={handleSubmit} >
        <TextField
          variant="outlined"
          type="email"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          onChange={e => setEmail(e.target.value)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          onChange={e => setPassword(e.target.value)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          id="confirm-password"
          onChange={e => setPasswordConfirmation(e.target.value)}
        />
        <FormHelperText error={error}>{helperText}</FormHelperText>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          disabled={loading}
        >
          {loading ? "Signing up..." : "Sign up"}
        </Button>
      </form>
    </div>
  </Container>
  );
};

export default Signup;