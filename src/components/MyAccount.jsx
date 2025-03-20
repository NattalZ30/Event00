import Login from "./login/Login"
function MyAccount({
    isLoggedIn,
    username
}){
    if (!isLoggedIn){
        return <Login />
    }
    return (
        <div className="insights-page">
            <div className="widget"></div>
            <div className="widget"></div>
        </div>
    )
}

export default MyAccount