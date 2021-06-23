import "./StoreItems.css";

function StoreItems(props) {
   const { items, cartButton, displayType } = props;

   const displayItems = items.map(item => {
      const { description, image, price, title, id } = item;

      const itemTitle = <p>{title}</p>;
      const itemPrice = <p>${price}</p>;
      const itemDescription = <p className="description">{description}</p>;

      const itemImage = <div className="image-container">
         <img src={image} alt={title} /></div>;

      const itemButton = (buttonType) => {
         return (
            <button onClick={() => cartButton(item, buttonType)}>{buttonType}</button>
         )
      }

      const itemQuantity = (type) => {
         return (
            <p>{item[type]}</p>
         )
      }

      let displayInformation = {};

      if (displayType === "cart") {
         displayInformation =
            <li
               className="cart-item flex-container"
               key={'cart-item' + id}
            >
               {itemImage}

               <div>
                  {itemTitle}

                  <div className="flex-container">
                     {itemPrice}
                     {itemButton("Remove")}
                     {itemQuantity("cartQuantity")}
                     {itemButton("Add")}
                     {itemButton("Clear")}
                  </div>
               </div>
            </li>
      } else if (displayType === "storePage") {
         displayInformation =
            <li
               className="store-item"
               key={id}
            >
               {itemImage}
               {itemTitle}

               <div className="flex-container">
                  {itemButton("Add")}
                  {itemPrice}
                  {itemQuantity("storeQuantity")}
               </div>
               {itemDescription}
            </li>
      }

      return (displayInformation);
   })

   return (
      <>
         {displayItems}
      </>
   )
}

export default StoreItems;