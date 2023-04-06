import "../../styles/signup.css";
import { useState } from "react";
import axios from "axios";

const Signup = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const [passError, setPassError] = useState(false);

  async function handleSignup() {
    if (password !== passwordAgain) {
      setError(false);
      return setPassError(true);
    } else {
      setPassError(false);
    }
    await axios
      .post("http://localhost:3333/users/signup", {
        userName: userName,
        email: email,
        password: password,
      })
      .then((res) => {
        if (res.status === 200) {
          setError(res.data);
        } else {
          setError(false);
          location.assign("/");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <>
      <div className="signup-form">
        <h2>Signup</h2>
        <label htmlFor="signup-userName">Username</label>
        <input
          onChange={(e) => {
            setUserName(e.target.value);
          }}
          style={{ outline: error === "Name" ? "1px solid red" : null }}
          type="text"
          required
          id="signup-userName"
        />
        <label htmlFor="signup-email">Email</label>
        <input
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          style={{ outline: error === "E-mail" ? "1px solid red" : null }}
          type="email"
          required
          id="signup-email"
        />
        <label htmlFor="signup-password">Password</label>
        <input
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          style={{ outline: passError ? "1px solid red" : null }}
          type="password"
          required
          id="signup-password"
        />
        <label htmlFor="signup-password-again">Re-enter Password</label>
        <input
          onChange={(e) => {
            setPasswordAgain(e.target.value);
          }}
          style={{ outline: passError ? "1px solid red" : null }}
          type="password"
          required
          id="signup-password-again"
        />
        <button
          disabled={
            userName.length < 1 || email.length < 1 || password < 1
              ? true
              : false
          }
          style={{
            backgroundColor:
              userName.length < 1 || email.length < 1 || password < 1
                ? "#acacac"
                : null,
          }}
          className="signup-submit"
          onClick={() => {
            handleSignup();
          }}
        >
          Submit
        </button>
        {passError ? <h3>Password is not the same</h3> : null}
        {error ? <h3>Could not create user, change {error}</h3> : null}
      </div>
    </>
  );
};

export default Signup;
