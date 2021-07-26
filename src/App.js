import './App.css';
import { useEffect, useState } from 'react';
import StoreItems from './StoreItems';
import FilterList from './FilterList';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlus, faMinus, faTrashAlt, faShoppingCart, faBars, faTimes } from '@fortawesome/free-solid-svg-icons'
library.add(faPlus, faMinus, faTrashAlt);

function App() {

   const [allStoreItems, setAllStoreItems] = useState([]);
   const [filteredItems, setfilteredItems] = useState([]);

   const [cartItems, setCartItems] = useState([]);
   const [totalCartQuantity, setTotalCartQuanity] = useState(0);
   const [cartIsActive, setCartIsActive] = useState(false);

   const [filterPanel, setFilterPanel] = useState(true);

   const filterOptions = [...new Set(allStoreItems.map(item => {
      return item.category;
   }))];
   

   useEffect(() => {
      fetch(`https://fakestoreapi.com/products`)
         .then(responce => responce.json())
         .then(jsonData => {
            const items = setQuantity(jsonData);
            setAllStoreItems(items);
            setfilteredItems(items);
         });
   }, [])

   //Adding cart, store, and storeMax quantity variables to api data
   function setQuantity(items) {
      const newItems = items.map(item => {
         const cartQuantity = 0;
         const storeMaxQuantity = Math.ceil(Math.random() * 10);
         const storeQuantity = storeMaxQuantity;

         return { ...item, cartQuantity, storeQuantity, storeMaxQuantity };
      })

      return newItems;
   }

   //Called every time a filter is clicked on page
   function sortItems(filters) {
      if (!filters.length) {
         setfilteredItems(allStoreItems);
         return
      }

      let newFilteredItems = [];

      filters.forEach(filter => {
         newFilteredItems.push(...allStoreItems.filter(item => {
            return item.category === filter;
         }))
      });

      setfilteredItems(newFilteredItems);
   }

   //Called every time any updating cart contents button is pressed
   //Updates all item quantities on page
   function changeCartQuantity(item, changeType) {
      if (changeType === "add" || changeType === "addToCart") {
         if (item.cartQuantity < item.storeMaxQuantity) {
            item.storeQuantity--;
            item.cartQuantity++;
         }
      } else if (changeType === "remove") {
         item.storeQuantity++;
         item.cartQuantity--;
      } else {
         item.cartQuantity = 0;
         item.storeQuantity = item.storeMaxQuantity;
      }

      const newCartItems = allStoreItems.filter(cartItem => {
         return cartItem.cartQuantity > 0;
      })

      let totalQuantity = 0;

      newCartItems.forEach(cartItem => {
         totalQuantity += cartItem.cartQuantity;
      })

      setTotalCartQuanity(totalQuantity);

      if (newCartItems.length === 0) {
         setCartIsActive(!cartIsActive);
      }

      setCartItems(newCartItems);
   }

   function toggleCart() {
      if (cartItems.length > 0) {
         setCartIsActive(!cartIsActive);
      }
   }

   function toggleFilterPanel() {
      setFilterPanel(!filterPanel);
   }

   return (
      <div>
         <header className="wrapper">
            <div className="flex-container">
               <button
                  className="filter-panel-button hidden"
                  onClick={toggleFilterPanel}
               >
                  <FontAwesomeIcon icon={faBars} />
               </button>
               <h1>B-Mart</h1>
            </div>

            <div className="cart">
               <button className="cart-button" onClick={toggleCart}>
                  {totalCartQuantity}
                  <FontAwesomeIcon icon={faShoppingCart} />
               </button>

               <div className={cartIsActive ? "cart-items" : "cart-items hidden"}>
                  <ul>
                     <StoreItems
                        items={cartItems}
                        cartButton={changeCartQuantity}
                        displayType="cart"
                     />
                  </ul>
               </div>
            </div>
         </header>

         <main className="wrapper">
            <div className="flex-container">
               <aside className={filterPanel ? "filter" : "filter off-screen"}>
                  <div className="close-filter-panel flex-container">
                     <button onClick={toggleFilterPanel}>
                        <FontAwesomeIcon icon={faTimes} />
                     </button>
                  </div>

                  <FilterList
                     filterOptions={filterOptions}
                     sortItems={sortItems}
                  />
               </aside>

               <section className="results-container flex-container">
                  <ul className="results flex-container">
                     <StoreItems
                        items={filteredItems}
                        cartButton={changeCartQuantity}
                        displayType="storePage"
                     />
                  </ul>
               </section>
            </div>
         </main>
         <footer>
            <p>Created at Juno College</p>
         </footer>
      </div>
   );
}

export default App;
