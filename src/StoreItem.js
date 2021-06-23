import "./StoreItem.css";

function StoreItem(props) {
   const { filteredItems, purchaseButton } = props;

   const displayItems = filteredItems.map(item => {
      const { description, image, price, title } = item;
      return (
         <li className="displayItem">
            <div className="image-container">
               <img src={image} alt={title} />
            </div>

            <p>{title}</p>

            <div className="description flex-container">
               <button onClick={purchaseButton}>Add to Cart</button>
               <p>{price}</p>
            </div>
            <p>{description}</p>
         </li>
      )
   })

   return (
      <div>
         <ul className="results flex-container">
            {displayItems}
         </ul>
      </div>
   )
}

export default StoreItem;