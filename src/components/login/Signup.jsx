import { HashLink } from "react-router-hash-link"
import React, {useState} from "react"
import {findUser, createUser} from "../../../mongoDB/conn"

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

        // try{
        //     const response = await findUser(username);  
        //     if (!response) {
        //         const create = await createUser(username, email, password);
        //         setSignInSuccessMessage("Sign Up Complete")
        //     } else {
        //         setError("Username already exists. Please change your username.");
        //     }
        // } catch(err){
        //     setError("An error occurred. Please try again.");
        // } finally {
        //     setLoading(false);
        // }
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