import "../../styles/signup.css";
import { useState } from "react";
import axios from "axios"

const Signup = () => {
const [userName, setUserName] = useState("")
const [password, setPassword] = useState("");
const [email, setEmail] = useState("");
const [error, setError] = useState(false)

async function handleSignup() {
  
await axios
    .post("http://localhost:3333/users/signup", {
      userName: userName,
      email: email,
      password: password,
    })
    .then((res) => {
      if(res.status === 200){
       setError(res.data)
        
      } else {
        setError(false)
        location.assign("/")
      }
    })
    .catch((error) => {
      console.log(error);
      console.log(".catch")
    })
    
}

  return (
    <>
     <div className="signup-form">
        <h2>Signup</h2>
        <label htmlFor="userName">Username</label>
        <input onChange={(e) => {setUserName(e.target.value)}}  type="text" required id="userName" />
        <label htmlFor="email">Email</label>
        <input onChange={(e) => {setEmail(e.target.value)}}  type="email" required id="email" />
        <label htmlFor="password">Password</label>
        <input onChange={(e) => {setPassword(e.target.value)}}  type="text" required id="password" />
        <button className="submit" onClick={() => {handleSignup()}}>Submit</button>
        {error ? <h3>Could not create user, change {error}</h3> : null}
        </div>
    </>
  );
};

export default Signup