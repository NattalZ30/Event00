import { HashLink } from "react-router-hash-link"
import React, {useState} from "react"
//import {findUser} from "../../../mongoDB/conn"
function Login({
    onStart,
    username, 
    setUsername,
    password,
    setPassword
}){
    const [error,setError] = useState("");
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("")
        setLoading(true);

        // try {
        //     const response = await findUser(username, password);
        
        //     if (response) {
        //         onStart();
        //     } else {
        //         setError("User not found. Please check your username and password.");
        //         setUsername("");
        //         setPassword("");
        //     }
        // } catch (err) {
        // setError("An error occurred. Please try again.");
        // } finally {
        // setLoading(false);
        // }
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
            {loading && <p className="loading-text">Loading...</p>}
            <p className="create-account-text">Don't have an account?</p>
            <HashLink to={"/sign-up#"} smooth><button className="account-button">Create Account Here</button></HashLink>
            </div>
        </div>
    )
}

export default Login