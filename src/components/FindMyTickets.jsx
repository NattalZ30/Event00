import { useState, useEffect } from "react"
import ItemCard from "./cards/ItemCard";
import { HashLink } from "react-router-hash-link";

function FindMyTickets(){
    const [userEmail, setUserEmail] = useState("")
    const [userFound, setUserFound] = useState(false)
    const [events, setEvents] = useState([]);
    const [message, setMessage] = useState("");
    const [error,setError] = useState("");
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("")
        setLoading(true);

        const response = await fetch("http://localhost:5000/api/findEventsByEmail", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email:userEmail }),
          });
        const data = await response.json();

        if (data.success) {
            setEvents(data.events);
            setUserFound(true)
        } else {
            setError(data.message);
            setLoading(false);
        }
    }

    if (userFound){
        return(
            <>
            <HashLink to={"/#"} smooth>Back to main page</HashLink>
            <div className="widget">
            <ul>
                {events.length > 0 ? events.map((event, index) => (
                <ItemCard id={index} event={event.event}/>
                )) : null}
            </ul>
            </div></>
        )
    }
    return (
        <div className="about-us-page" onSubmit={handleSubmit}>
            <HashLink to={"/#"} smooth>Back to main page</HashLink>
            <div className="widget">
                <form className="login-form">
                    <h1>Find all your tickets</h1>
                    <input
                    className="login-input"
                    type="email"
                    placeholder="email"
                    value={userEmail}
                    onChange={(e)=> setUserEmail(e.target.value)}
                    required
                    />
                    <button type="submit" disabled={loading}>
                        Find My Tickets
                    </button>
                </form>
                {error && <p className="error-message">{error}</p>}
                {loading && <p className="loading-text">Loading...</p>}
            </div>
        </div>
    )
}

export default FindMyTickets