function ItemCard({name, content}){
    return (
        <div className="item-card">
            <h1>{name}</h1>
            <p>{content}</p>
        </div>
    )
}

export default ItemCard