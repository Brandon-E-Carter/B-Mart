import "./StoreItem.css";

function StoreItem(props) {
    const { description, image, price, title } = props.displayItem;
    const purchaseButton = props.purchaseButton;
    console.log(description);

    return (
        <div className="displayItem">
            <div className="image-container">
                <img src={image} alt={title} />
            </div>

            <p>{title}</p>

            <div className="description flex-container">
                <button onClick={purchaseButton}>Add to Cart</button>
                <p>{price}</p>
            </div>
            <p>{description}</p>
        </div>
    )
}

export default StoreItem;