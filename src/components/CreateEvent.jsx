import { useState } from "react";
import { HashLink } from "react-router-hash-link";

function CreateEvent({
    username
}){
    const [error,setError] = useState("");
    const [loading, setLoading] = useState(false)
    const [successMessage, setSuccessMessage] = useState("");
    const [title, setTitle] = useState()
    const [description, setDescription] = useState()
    const [start, setStart] = useState()
    const [end, setEnd] = useState()
    const [location, setLocation] = useState()

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("")
        setLoading(true);

        const response = await fetch("http://localhost:5000/api/createEvent", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title, description, start:start+":00", end:end+":00", location, posted_by: username }),
        });
    
        const data = await response.json();
        data.success? setSuccessMessage("event created"):setError(data.message)
        setLoading(false)
    }

    return (
        <div className="login-page" onSubmit={handleSubmit}>
            <div className="widget">
            <h1>Create your event</h1>
            <form className="login-form">
                <input
                    className="login-input"
                    type="text"
                    placeholder="title"
                    value={title}
                    onChange={(e)=> setTitle(e.target.value)}
                    required
                />
                <input
                    className="login-input"
                    type="text"
                    placeholder="description" 
                    value={description}
                    onChange={(e)=> setDescription(e.target.value)}
                    required
                />
                Start
                <input
                    className="login-input"
                    type="datetime-local"
                    placeholder="start" 
                    value={start}
                    onChange={(e)=> setStart(e.target.value)}
                    max={end}
                    required
                />
                End
                <input
                    className="login-input"
                    type="datetime-local"
                    placeholder="end" 
                    value={end}
                    min={start}
                    onChange={(e)=> setEnd(e.target.value)}
                    required
                />
                <input
                    className="login-input"
                    type="text"
                    placeholder="location" 
                    value={location}
                    onChange={(e)=> setLocation(e.target.value)}
                    required
                />
                <button type="submit" disabled={loading}>
                    Create Event
                </button>
            </form>
            {error && <p className="error-message">{error}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>}
            {loading && <p className="loading-text">Loading...</p>}
            <div>______</div>
            <HashLink to={"/#"} smooth><button className="account-button">Back To Main Menu</button></HashLink>
            </div>
        </div>
    )
}

export default CreateEvent