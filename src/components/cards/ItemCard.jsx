import { HashLink } from "react-router-hash-link"
function ItemCard({event}){
    return (
        <div className="item-card">
            <HashLink to={`/event/${event.event_id}#`}>
            <h1>{event.title}</h1>
            <p>{event.start.replace("T"," ")}</p>
            </HashLink>
        </div>
    )
}

export default ItemCard