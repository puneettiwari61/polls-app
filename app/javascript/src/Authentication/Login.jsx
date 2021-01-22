import React, { useState } from "react";

import LoginForm from "./Form/LoginForm";
import authApi from ".././apis/auth";
// import { setAuthHeaders } from "apis/axios";
import { setToLocalStorage } from "./../helpers/storage";
import { setAuthHeaders } from "../apis/axios";

const Login = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await authApi.login({ login: { email, password } });
      console.log(response, "login successfull");
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
      console.log(error, "login unsuccessful");
      setLoading(false);
    }
  };

  return (
    <LoginForm
      setEmail={setEmail}
      setPassword={setPassword}
      loading={loading}
      handleSubmit={handleSubmit}
    />
  );
};

export default Login;
