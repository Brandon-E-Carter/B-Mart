import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function StoreItems(props) {
   const { items, cartButton, displayType } = props;

   const displayItems = items.map(item => {
      const { image, price, title, id } = item;

      const itemTitle = <p>{title}</p>;
      const itemPrice = <p>${price}</p>;

      const itemImage = <div className="image-container">
         <img src={image} alt={title} /></div>;

      const itemButton = (buttonType) => {
         let icon = "plus";

         if (buttonType === "remove") {
            icon = "minus"
         } else if (buttonType === "clear") {
            icon = "trash-alt"
         }

         let buttonText = <>
            <span className="sr-only">{buttonType}</span>
            <FontAwesomeIcon icon={icon} />
         </>

         if (buttonType === "addToCart") {
            buttonText = "Add to Cart"
         }

         return (
            <button
               className={buttonType}
               onClick={() => cartButton(item, buttonType)}
            >
               {buttonText}
            </button>
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

                  <div className="cart-item-price flex-container">
                     {itemPrice}

                     <div className="quantity flex-container">
                        {itemButton("remove")}
                        {itemQuantity("cartQuantity")}
                        {itemButton("add")}
                        {itemButton("clear")}
                     </div>
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
                  {itemButton("addToCart")}
                  {itemPrice}
                  {itemQuantity("storeQuantity")}
               </div>
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