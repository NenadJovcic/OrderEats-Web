import "../../styles/login.css";
import { useState } from "react";
import axios from "axios"

const Login = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false)
  const oneDay = 24 * 60 * 60 * 1000;



  async function handleLogin() {
    await axios
      .post("http://localhost:3333/users/login", {
        email: email,
        password: password,

      })
      .then((res) => {

        localStorage.setItem('auth-token', res.data);
        setTimeout(() => {
          localStorage.removeItem('auth-token')
        }, oneDay);
      })
      .catch((error) => {
        console.log(error)
        setError(error.response.data.message)
      })
  }

  return (
    <>
      <div className="login-form">
        <h2>Login</h2>
        <label htmlFor="email">Email</label>
        <input onChange={(e) => { setEmail(e.target.value) }} style={{ outline: error ? "1px solid red" : null }} type="email" required id="email" />
        <label htmlFor="password">Password</label>
        <input onChange={(e) => { setPassword(e.target.value) }} style={{ outline: error ? "1px solid red" : null }} type="password" required id="password" />
        <button disabled={email.length < 1 || password < 1 ? true : false} style={{ backgroundColor: email.length < 1 || password < 1 ? "#acacac" : null }} className="submit" onClick={() => { handleLogin() }}>Submit</button>
        {error ? <h3>{error}</h3> : null}

      </div>
    </>
  );
};

export default Login;