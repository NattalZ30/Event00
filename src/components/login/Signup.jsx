import { HashLink } from "react-router-hash-link"
import React, {useState} from "react"
//import {findUser, createUser} from "../../../mongoDB/conn"

function Signup(){
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [signInSuccessMessage, setSignInSuccessMessage] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("")
        setSignInSuccessMessage("")

        const response = await fetch("http://localhost:5000/api/createUser", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, email, password }),
          });
      
          const data = await response.json();
          if (data.success) {
            setSignInSuccessMessage("User created successfully!");
          } else {
            setSignInSuccessMessage("Error creating user. Try again.");
          }
    }

    return (
        <div className="login-page" onSubmit={handleSubmit}>
            <HashLink to={"/#"} smooth>Back to main page</HashLink>
            <div className="widget">
            <h1>Create a New Account</h1>
            <form className="login-form">
                <input
                    className="login-input"
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e)=> setUsername(e.target.value)}
                />
                <input
                    className="login-input"
                    type="email"
                    placeholder="email"
                    value={email}
                    onChange={(e)=> setEmail(e.target.value)}
                />
                <input
                    className="login-input"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e)=> setPassword(e.target.value)} 
                />
                <button type="submit" disabled={loading}>
                    Sign up
                </button>
            </form>
            {error && <p className="error-message">{error}</p>}
            {signInSuccessMessage && <p className="success-message">{signInSuccessMessage}</p>}
            <p></p>
            <HashLink to={"/login#"} smooth><button className="account-button">Back to login</button></HashLink>
            </div>
        </div>
    )
}

export default Signup