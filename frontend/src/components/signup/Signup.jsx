import "../../styles/signup.css";
import { useState } from "react";
import axios from "axios"

const Signup = () => {
const [userName, setUserName] = useState("")
const [password, setPassword] = useState("");
const [email, setEmail] = useState("");

function handleSignup() {
 axios
    .post("http://localhost:3333/users/signup", {
      userName: userName,
      email: email,
      password: password,
    })
    .then(function (response) {
      console.log(response);
    })
    .catch((error) => {
      throw error;
    });
}

  return (
    <>
      <form className="signup-form">
        <h2>Signup</h2>
        <label htmlFor="userName">Username</label>
        <input onChange={(e) => {setUserName(e.target.value)}}  type="text" required id="userName" />
        <label htmlFor="email">Email</label>
        <input onChange={(e) => {setEmail(e.target.value)}}  type="email" required id="email" />
        <label htmlFor="password">Password</label>
        <input onChange={(e) => {setPassword(e.target.value)}}  type="text" required id="password" />
        <button className="submit" onClick={() => {handleSignup()}}>Submit</button>
        </form>
    </>
  );
};

export default Signup;
