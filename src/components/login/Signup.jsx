import { HashLink } from "react-router-hash-link"
import React, {useState} from "react"
//import {findUser, createUser} from "../../../mongoDB/conn"

function Signup({
    username, 
    setUsername,
    email,
    setEmail,
    password,
    setPassword,
}){
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
            setMessage("User created successfully!");
          } else {
            setMessage("Error creating user. Try again.");
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
                />
                <input
                    className="login-input"
                    type="text"
                    placeholder="email"
                />
                <input
                    className="login-input"
                    type="password"
                    placeholder="Password" 
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