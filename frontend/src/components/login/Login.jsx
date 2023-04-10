import "../../styles/login.css";
import { useState } from "react";
import axios from "axios";
import LoginForm from "./LoginForm";

const Login = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const [error, setError] = useState(false);
  const oneDay = 24 * 60 * 60 * 1000;

  async function handleLogin() {
    await axios
      .post("http://localhost:3333/users/login", {
        email: email,
        password: password,
      })
      .then((res) => {
        localStorage.setItem("auth-token", res.data.token);
        localStorage.setItem("user", res.data.user._id);
        setTimeout(() => {
          localStorage.removeItem("auth-token");
          localStorage.removeItem("user");
        }, oneDay);
        location.assign("/");
      })
      .catch((error) => {
        console.log(error);
        setError(error.response.data.message);
      });
  }

  return (
    <>
      <LoginForm
        setEmail={setEmail}
        email={email}
        setPassword={setPassword}
        handleLogin={handleLogin}
        error={error}
      />
    </>
  );
};

export default Login;
