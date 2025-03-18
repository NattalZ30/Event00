function FindMyTickets(){
    return (
        <div className="about-us-page">
            <div className="widget">
                <div className="widget-2">
                    <form>
                        <input
                        className="login-input"
                        type="text"
                        placeholder="email"
                        />
                        <button type="submit" disabled={loading}>
                            Find My Tickets
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default FindMyTickets