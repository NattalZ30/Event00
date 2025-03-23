import { HashLink } from "react-router-hash-link"
import React, {useState} from "react"
//import {findUser} from "../../../mongoDB/conn"
function Login({
    username, 
    setUsername,
    password,
    setPassword,
    setIsLoggedIn,
}){
    const [error,setError] = useState("");
    const [loading, setLoading] = useState(false)
    const [loginSuccessMessage, setLoginSuccessMessage] = useState("");

    const loginSuccess = (data) => {
        setIsLoggedIn(true)
        setLoginSuccessMessage(data.message)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("")
        setLoading(true);

        const response = await fetch("http://localhost:5000/api/findUser", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
          });
      
          const data = await response.json();
          data.success? loginSuccess(data):setError(data.message)
          setLoading(false)
    }

    return (
        <div className="login-page" onSubmit={handleSubmit}>
            <HashLink to={"/#"} smooth>Back to main page</HashLink>
            <div className="widget">
            <h1>Sign In to Account</h1>
            <form className="login-form">
                <input
                    className="login-input"
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e)=> setUsername(e.target.value)}
                    required
                />
                <input
                    className="login-input"
                    type="password"
                    placeholder="Password" 
                    value={password}
                    onChange={(e)=> setPassword(e.target.value)}
                    required
                />
                <button type="submit" disabled={loading}>
                    Login
                </button>
            </form>
            {error && <p className="error-message">{error}</p>}
            {loginSuccessMessage && <p className="success-message">{loginSuccessMessage}</p>}
            {loading && <p className="loading-text">Loading...</p>}
            <p className="create-account-text">Don't have an account?</p>
            <HashLink to={"/sign-up#"} smooth><button className="account-button">Create Account Here</button></HashLink>
            </div>
        </div>
    )
}

export default Login