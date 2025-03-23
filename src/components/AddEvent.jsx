import { HashLink } from "react-router-hash-link"
import React, {useState} from "react"
//import {findUser} from "../../../mongoDB/conn"
function AddEvent({event}){
    const [error,setError] = useState("");
    const [loading, setLoading] = useState(false)
    const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [successMessage, setSuccessMessage] = useState("");


    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("")
        setLoading(true);

        const response = await fetch("http://localhost:5000/api/addTicket", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ fullName, email, event }),
          });
      
          const data = await response.json();
          data.success? setSuccessMessage("You have successfully signed up to event"):setError(data.message)
          setLoading(false)
    }

    return (
        <div className="login-page" onSubmit={handleSubmit}>
            <HashLink to={"/#"} smooth>Back to main page</HashLink>
            <div className="widget">
            <h1>Sign Up to Event</h1>
            <form className="login-form">
                <input
                    className="login-input"
                    type="text"
                    placeholder="full name"
                    value={fullName}
                    onChange={(e)=> setFullName(e.target.value)}
                    required
                />
                <input
                    className="login-input"
                    type="email"
                    placeholder="email" 
                    value={email}
                    onChange={(e)=> setEmail(e.target.value)}
                    required
                />
                <button type="submit" disabled={loading}>
                    Sign Up to Event
                </button>
                <HashLink to={`/event/${event.event_id}/add-to-calender`}><button className="add-calender">
                    Add to Calender
                </button></HashLink>
            </form>
            {error && <p className="error-message">{error}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>}
            {loading && <p className="loading-text">Loading...</p>}
            </div>
        </div>
    )
}

export default AddEvent