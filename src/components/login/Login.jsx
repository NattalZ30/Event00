import { HashLink } from "react-router-hash-link"
import React, {useState} from "react"

function Login(){
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
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
                />
                <input
                    className="login-input"
                    type="password"
                    placeholder="Password" 
                />
                <button type="submit" disabled={loading}>
                    Login
                </button>
            </form>
            </div>
        </div>
    )
}

export default Login