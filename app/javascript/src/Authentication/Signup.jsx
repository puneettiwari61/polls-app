import React, { useState } from "react";

import SignupForm from "./Form/SignupForm";
import authApi from "../apis/auth";
import { setAuthHeaders } from "../apis/axios";
import { setToLocalStorage } from "../helpers/storage";


const Signup = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false)
  const [helperText, setHelperText] = React.useState('Choose wisely');

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
    <SignupForm
      setEmail={setEmail}
      setPassword={setPassword}
      setPasswordConfirmation={setPasswordConfirmation}
      loading={loading}
      handleSubmit={handleSubmit}
      error={error}
      helperText={helperText}
    />
  );
};

export default Signup;